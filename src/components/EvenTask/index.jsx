import { Stack } from 'react-bootstrap'
import { Typography, Button, Dropdown } from 'antd'
import Card from '../Core/Card'
import { MoreOutlined, LeftOutlined } from '@ant-design/icons'

import ListMenu from '../ListMenu'
import EventTaskModal from '../EventTaskModal'
import { StyledEventTaskItem, StyledEventTaskItemContent, CircleIndicator } from './components'
import { useModal } from '../../hooks/useModal'

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

  return (
    <>
      <EventTaskModal
        title='Add Task'
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          type: 'Task'
        }}
      />
      <Card title="My Tasks" onExtraClick={handleOpen}>
        <EventTaskItem text='Task 1' type='task' checked />
        <EventTaskItem text='Task 2' type='task' />
        <EventTaskItem text='Task 3' type='task' />
        <EventTaskItem text='Task 1' type='task' checked />
        <EventTaskItem text='Task 2' type='task' />
        <EventTaskItem text='Task 3' type='task' />
        <EventTaskItem text='Task 1' type='task' checked />
        <EventTaskItem text='Task 2' type='task' />
        <EventTaskItem text='Task 3' type='task' />
      </Card>
    </>
  )
}

const Events = () => {
  const { isOpen, handleOpen, handleClose } = useModal()

  return (
    <>
      <EventTaskModal
        title='Add Task'
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          type: 'Event'
        }}
      />
      <Card title="My Events" onExtraClick={handleOpen}>
        <EventTaskItem text='Event 1' type='event' />
        <EventTaskItem text='Event 2' type='event' />
        <EventTaskItem text='Event 3' type='event' />
      </Card>
    </>
  )
}

const EventTaskItem = ({ text, checked = false, color = '#ccc', type }) => {
  return (
    <StyledEventTaskItem color={color} className='mb-2'>
      <StyledEventTaskItemContent>
        <CircleIndicator color={color} checked={checked} />
        <Text className='flex-grow-1'>{text}</Text>
        <Dropdown
          overlay={
            <ListMenu onEditClick={() => null} onDeleteClick={() => null} type={type} />
          }
          placement='bottomRight'
          trigger={['click']}
          overlayStyle={{ zIndex: 99999999 }}
        >
          <Button type='text' className='more-indicator' icon={<MoreOutlined style={{ color: '#858585', fontSize: '1.1em' }} />} />
        </Dropdown>
      </StyledEventTaskItemContent>
    </StyledEventTaskItem>
  )
}

export default EventTask
