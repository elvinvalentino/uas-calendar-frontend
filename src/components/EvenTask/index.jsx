import { Stack } from 'react-bootstrap'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import Card from '../Core/Card'

import { StyledEventTaskItem, StyledEventTaskItemContent, CircleIndicator } from './components'

const { Title, Text } = Typography

const EventTask = () => {
  return (
    <Stack gap={2} className='h-100'>
      <Title level={5} style={{ textAlign: 'center', marginBottom: 5 }}>My Tasks & Events</Title>
      <Card title="My Tasks" extra={<CardHeaderExtra />}>
        <EventTaskItem text='Task 1' checked />
        <EventTaskItem text='Task 2' />
        <EventTaskItem text='Task 3' />
        <EventTaskItem text='Task 1' checked />
        <EventTaskItem text='Task 2' />
        <EventTaskItem text='Task 3' /> <EventTaskItem text='Task 1' checked />
        <EventTaskItem text='Task 2' />
        <EventTaskItem text='Task 3' />
      </Card>
      <Card title="My Events" extra={<CardHeaderExtra />}>
        <EventTaskItem text='Event 1' />
        <EventTaskItem text='Event 2' />
        <EventTaskItem text='Event 3' />
      </Card>
    </Stack>
  )
}

const EventTaskItem = ({ text, checked = false, color = '#ccc' }) => {
  return (
    <StyledEventTaskItem color={color} className='mb-2'>
      <StyledEventTaskItemContent>
        <CircleIndicator color={color} checked={checked} />
        <Text>{text}</Text>
      </StyledEventTaskItemContent>
    </StyledEventTaskItem>
  )
}

const CardHeaderExtra = ({ ...rest }) => {
  const style = {
    fontSize: '1.2em'
  }

  return <Button
    type='text'
    style={style}
    icon={
      <PlusOutlined
        style={{ color: '#ccc' }}
      />
    }
    {...rest}
  />
}

export default EventTask
