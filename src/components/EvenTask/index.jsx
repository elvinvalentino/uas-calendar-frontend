import { useContext, useState } from 'react'
import { Stack } from 'react-bootstrap'
import { Typography, Button, Dropdown, Modal } from 'antd'
import Card from '../Core/Card'
import { useGoogleLogin } from 'react-google-login';
import { MoreOutlined, LeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import ListMenu from '../ListMenu'
import EventTaskModal from '../EventTaskModal'
import LoadingIndicator from '../LoadingIndicator'
import { StyledEventTaskItem, StyledEventTaskItemContent, CircleIndicator } from './components'
import { useModal } from '../../hooks/useModal'
import { DataContext } from '../../contexts/data'
import { AuthContext } from '../../contexts/auth'
import Service from '../../utils/Service'
import { getToken } from '../../utils/getToken';
import { getFormattedDate } from '../../utils/date'
import axios from '../../axios';

import moment from 'moment'


const { Title, Text } = Typography

const EventTask = ({ setIsExpanded, goToDate }) => {
  const { login } = useContext(AuthContext)

  const responseGoogle = async (response) => {
    if (response.error) return console.log(response)
    const { email, name, imageUrl } = response.profileObj
    const { data } = await axios.post('/api/users', {
      email,
      username: name,
      profilePicture: imageUrl,
    })

    login(data)
  }

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    onSuccess: responseGoogle,
    cookiePolicy: 'single_host_origin'
  })

  return (
    <Stack gap={2} className='position-relative h-100'>
      <Button
        type="text"
        icon={<LeftOutlined style={{ color: '#ccc' }} />}
        className='position-absolute top-0 end-0'
        onClick={() => setIsExpanded(false)}
      />
      <Title level={5} style={{ textAlign: 'center', marginBottom: 5 }}>My Tasks & Events</Title>
      <Tasks signIn={signIn} goToDate={goToDate} />
      <Events signIn={signIn} goToDate={goToDate} />
    </Stack>
  )
}

const Tasks = ({ signIn, goToDate }) => {
  const { isOpen, handleOpen, handleClose } = useModal()
  const { events, isFetchData } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

  const filteredEvents = events.filter(e => e.type === 'Task')

  const openModal = () => {
    if (!isAuthenticate) {
      signIn()
      return
    }

    handleOpen()
  }

  return (
    <>
      <EventTaskModal
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          type: 'Task'
        }}
        centered
        backdrop='static'
      />
      <Card title="My Tasks" onExtraClick={openModal}>
        {isFetchData && <LoadingIndicator />}
        {!isFetchData && filteredEvents.length === 0 && (
          <Text>Task is empty. Press + to add task</Text>
        )}
        {!isFetchData && filteredEvents.map(e => (
          <EventTaskItem key={e._id} data={e} goToDate={goToDate} />
        ))}
      </Card>
    </>
  )
}

const Events = ({ signIn, goToDate }) => {
  const { isOpen, handleOpen, handleClose } = useModal()
  const { events, isFetchData } = useContext(DataContext)

  const { isAuthenticate } = useContext(AuthContext)

  const filteredEvents = events.filter(e => e.type === 'Event')

  const openModal = () => {
    if (!isAuthenticate) {
      signIn()
      return
    }

    handleOpen()
  }

  return (
    <>
      <EventTaskModal
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          type: 'Event'
        }}
        centered
        backdrop='static'
      />
      <Card title="My Events" onExtraClick={openModal}>
        {isFetchData && <LoadingIndicator />}
        {!isFetchData && filteredEvents.length === 0 && (
          <Text>Event is empty. Press + to add event</Text>
        )}
        {!isFetchData && filteredEvents.map(e => (
          <EventTaskItem key={e._id} data={e} goToDate={goToDate} />
        ))}
      </Card>
    </>
  )
}

const EventTaskItem = ({ data, type, goToDate }) => {
  const [isHoverMore, setIsHoverMore] = useState(false)
  const { handleClose, handleOpen, isOpen } = useModal()
  const { deleteData, updateData } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

  const handleOnClick = async () => {
    if (data.type === 'Event' || isHoverMore) return
    if (!isAuthenticate) return
    const token = getToken()

    const { dateStart, dateEnd, ...restValues } = data

    const formattedValues = {
      ...restValues,
      dateStart: `${moment(dateStart).format('YYYY-MM-DD HH:MM')}+0700`,
      dateEnd: `${moment(dateEnd).format('YYYY-MM-DD HH:MM')}+0700`,
    }

    updateData('event', {
      ...data,
      isDone: !data.isDone
    })
    await Service.updateEvent(token, data._id, {
      ...formattedValues,
      isDone: !data.isDone
    });
  }

  const deleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete this ${type}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk: async () => {
        if (!isAuthenticate) return
        const token = getToken()
        await Service.deleteEvent(token, data._id)
        deleteData('event', data._id)
      }
    })
  }

  return (
    <>
      <EventTaskModal
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          ...data,
          dateStart: moment(data.dateStart),
          dateEnd: moment(data.dateEnd),
          ...(!data.isAllDay && {
            timeStart: moment(data.dateStart),
            timeEnd: moment(data.dateEnd),
          })
        }}
        centered
        backdrop='static'
        action='update'
      />
      <StyledEventTaskItem color={data.category.hex} className='mb-2' onClick={handleOnClick}>
        <StyledEventTaskItemContent>
          <CircleIndicator color={data.category.hex} checked={data.type === 'Task' ? data.isDone : moment().isAfter(data.dateStart)} />
          <div className='flex-grow-1'>
            <Text className='d-block fw-bold' style={{
              ...((data.type === 'Task' && data.isDone) && {
                textDecoration: 'line-through'
              })
            }}>
              {data.title}
            </Text>
            <Text type='secondary'>
              {getFormattedDate(data.dateStart)}
            </Text>
          </div>
          <Dropdown
            overlay={
              <ListMenu
                onEditClick={handleOpen}
                onDeleteClick={deleteConfirm}
                type={data.type.toLowerCase()}
                onMouseEnter={() => setIsHoverMore(true)}
                onMouseLeave={() => setIsHoverMore(false)}
                goToDate={goToDate}
                destinationDate={data.dateStart}
              />
            }
            placement='bottomRight'
            trigger={['click']}
            overlayStyle={{ zIndex: 99999999 }}
          >
            <Button
              onMouseEnter={() => setIsHoverMore(true)}
              onMouseLeave={() => setIsHoverMore(false)}
              type='text'
              className='more-indicator'
              icon={
                <MoreOutlined
                  style={{ color: '#858585', fontSize: '1.1em' }}
                />
              }
            />
          </Dropdown>
        </StyledEventTaskItemContent>
      </StyledEventTaskItem>
    </>
  )
}

export default EventTask
