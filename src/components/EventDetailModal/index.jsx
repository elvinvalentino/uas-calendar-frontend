import { useContext, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Modal as AntdModal } from 'antd'
import { Typography, Button, Tooltip } from 'antd'
import { useTheme } from 'styled-components'
import moment from 'moment'
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CalendarOutlined,
  AlignLeftOutlined,
  TagOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import {
  EventDetailHeaderContainer,
  EventDetailHeaderTitle,
  EventDetailHeaderAction,
  EventDetailContent,
  EventDetailContentList
} from './components'
import EventTaskModal from '../EventTaskModal'
import { getFormattedDate, getFormattedTime, isSameDay } from '../../utils/date'
import { useModal } from '../../hooks/useModal'
import { DataContext } from '../../contexts/data'
import { AuthContext } from '../../contexts/auth'
import Service from '../../utils/Service'
import { getToken } from '../../utils/getToken';


const { Title, Text } = Typography

const EventDetailModal = ({ onHide, onOpen, event: receivedEvent, ...rest }) => {
  const [event, setEvent] = useState(receivedEvent)
  const { handleClose, handleOpen, isOpen } = useModal()
  const { isAuthenticate } = useContext(AuthContext)
  const { deleteData, updateData } = useContext(DataContext)

  const theme = useTheme();

  useEffect(() => {
    setEvent(receivedEvent)
  }, [receivedEvent])

  const onEditClick = () => {
    onHide()
    handleOpen();
  }

  const deleteConfirm = () => {
    onHide();
    AntdModal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete this ${event.type.toLowerCase()}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk: async () => {
        if (!isAuthenticate) return
        const token = getToken()
        await Service.deleteEvent(token, event._id)
        deleteData('event', event._id)
      },
      onCancel: () => onOpen()
    })
  }

  const actionIconStyle = (isDanger = false) => ({
    fontSize: '1.2em',
    color: theme.fontColor.main,
    ...(isDanger && {
      color: theme.color.danger
    })
  })

  const afterSubmit = (data) => {
    onOpen()
    setEvent(data)
  }

  const handlecomplete = async () => {
    if (event.type === 'Event') return
    if (!isAuthenticate) return
    const token = getToken()

    const { dateStart, dateEnd, ...restValues } = event

    const formattedValues = {
      ...restValues,
      dateStart: `${moment(dateStart).format('YYYY-MM-DD HH:MM')}+0700`,
      dateEnd: `${moment(dateEnd).format('YYYY-MM-DD HH:MM')}+0700`,
      isDone: !event.isDone
    }

    updateData('event', {
      ...event,
      isDone: !event.isDone
    })
    setEvent({
      ...event,
      isDone: !event.isDone
    })
    await Service.updateEvent(token, event._id, {
      ...formattedValues,
    });

  }
  return (
    <>
      <EventTaskModal
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          ...event,
          dateStart: moment(event.dateStart),
          dateEnd: moment(event.dateEnd),
          ...(!event.isAllDay && {
            timeStart: moment(event.dateStart),
            timeEnd: moment(event.dateEnd),
          })
        }}
        centered
        backdrop='static'
        action='update'
        afterClose={onOpen}
        afterSubmit={afterSubmit}
      />
      <Modal onHide={onHide} {...rest}>
        <Modal.Body>
          <EventDetailHeaderContainer>
            <EventDetailHeaderTitle>
              <Title level={3} className='mb-0'>{event.title}</Title>
            </EventDetailHeaderTitle>
            <EventDetailHeaderAction>
              <Tooltip title='Delete'>
                <Button type='text' icon={<DeleteOutlined style={actionIconStyle(true)} />} onClick={deleteConfirm} />
              </Tooltip>
              <Tooltip title='Edit'>
                <Button type='text' className='ms-2' icon={<EditOutlined style={actionIconStyle()} />} onClick={onEditClick} />
              </Tooltip>
              <Tooltip title='Close'>
                <Button type='text' className='ms-2' icon={<CloseOutlined style={actionIconStyle()} />} onClick={onHide} />
              </Tooltip>
            </EventDetailHeaderAction>
          </EventDetailHeaderContainer>
          <EventDetailContent>
            <EventDetailContentList>
              <CalendarOutlined style={{ fontSize: '1.6em', color: theme.fontColor.main }} />
              {event.isAllDay ? (
                <Text className='ms-4'>
                  {isSameDay(event.dateStart, event.dateEnd) && `${getFormattedDate(event.dateStart)}, All day`}
                  {!isSameDay(event.dateStart, event.dateEnd) && `${getFormattedDate(event.dateStart)} - ${getFormattedDate(event.dateEnd)}`}
                </Text>
              ) : (
                <Text className='ms-4'>
                  {getFormattedDate(event.dateStart)}
                  {', '}
                  {getFormattedTime(event.dateStart)}
                  {' - '}
                  {getFormattedTime(event.dateEnd)}
                </Text>
              )}
            </EventDetailContentList>
            <EventDetailContentList>
              <AlignLeftOutlined style={{ fontSize: '1.6em', color: theme.fontColor.main }} />
              <Text className='ms-4'>
                {event.description || 'No Description'}
              </Text>
            </EventDetailContentList>
            <EventDetailContentList>
              <TagOutlined style={{ fontSize: '1.6em', color: theme.fontColor.main }} />
              <Text className='ms-4'>
                {event.category?.name}
              </Text>
            </EventDetailContentList>
          </EventDetailContent>
        </Modal.Body>
        {event.type === 'Task' && (
          <Modal.Footer>
            <Button type='link' onClick={handlecomplete}>
              {!event.isDone ? `Mark as complete` : `Mark as uncomplete`}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

export default EventDetailModal