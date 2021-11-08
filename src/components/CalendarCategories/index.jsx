import { Stack } from 'react-bootstrap'
import { Button, Typography, Calendar } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const { Title } = Typography

const CalendarCategories = ({ setIsExpanded }) => {
  return (
    <Stack gap={2} className='position-relative h-100'>
      <Button
        type="text"
        icon={<RightOutlined style={{ color: '#ccc' }} />}
        className='position-absolute top-0 left-0'
        onClick={() => setIsExpanded(false)}
      />
      <Title level={5} style={{ textAlign: 'center', marginBottom: 5 }}>Welcome, User</Title>
      <Calendar
        fullscreen={false}
        headerRender={() => null}
      />
    </Stack>
  )
}

export default CalendarCategories
