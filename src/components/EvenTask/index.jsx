import { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { Typography, Button, Dropdown, Modal } from 'antd'
import Card from '../Core/Card'
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
import moment from 'moment'

const { Title, Text } = Typography

const EventTask = ({ setIsExpanded }) => {
  return (
    <Stack gap={2} className='position-relative h-100'>
      <Button
        type="text"
        icon={<LeftOutlined style={{ color: '#ccc' }} />}
        className='position-absolute top-0 end-0'
        onClick={() => setIsExpanded(false)}
      />
      <Title level={5} style={{ textAlign: 'center', marginBottom: 5 }}>My Tasks & Events</Title>
      <Tasks />
      <Events />
    </Stack>
  )
}

const Tasks = () => {
  const { isOpen, handleOpen, handleClose } = useModal()
  const { events, isFetchData } = useContext(DataContext)

  const filteredEvents = events.filter(e => e.type === 'Task')

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
      <Card title="My Tasks" onExtraClick={handleOpen}>
        {isFetchData && <LoadingIndicator />}
        {!isFetchData && filteredEvents.length === 0 && (
          <Text>Task is empty. Press + to add task</Text>
        )}
        {!isFetchData && filteredEvents.map(e => (
          <EventTaskItem data={e} />
        ))}
      </Card>
    </>
  )
}

const Events = () => {
  const { isOpen, handleOpen, handleClose } = useModal()
  const { events, isFetchData } = useContext(DataContext)

  const filteredEvents = events.filter(e => e.type === 'Event')

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
      <Card title="My Events" onExtraClick={handleOpen}>
        {isFetchData && <LoadingIndicator />}
        {!isFetchData && filteredEvents.length === 0 && (
          <Text>Event is empty. Press + to add event</Text>
        )}
        {!isFetchData && filteredEvents.map(e => (
          <EventTaskItem data={e} />
        ))}
      </Card>
    </>
  )
}

const EventTaskItem = ({ data, type }) => {
  const { handleClose, handleOpen, isOpen } = useModal()
  const { deleteData } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

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
      <StyledEventTaskItem color={data.category.hex} className='mb-2'>
        <StyledEventTaskItemContent>
          <CircleIndicator color={data.category.hex} checked={data.type === 'Task' ? data.isDone : false} />
          <Text className='flex-grow-1'>{data.title}</Text>
          <Dropdown
            overlay={
              <ListMenu onEditClick={handleOpen} onDeleteClick={deleteConfirm} type={data.type.toLowerCase()} />
            }
            placement='bottomRight'
            trigger={['click']}
            overlayStyle={{ zIndex: 99999999 }}
          >
            <Button type='text' className='more-indicator' icon={<MoreOutlined style={{ color: '#858585', fontSize: '1.1em' }} />} />
          </Dropdown>
        </StyledEventTaskItemContent>
      </StyledEventTaskItem>
    </>
  )
}

export default EventTask
