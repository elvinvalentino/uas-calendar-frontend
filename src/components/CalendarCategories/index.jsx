import { Stack } from 'react-bootstrap'
import { Button, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'

import Card from '../Core/Card'
import SmallCalendar from '../SmallCalendar'
import { CircleIndicator, CategoryItemContainer } from './components'

const { Title, Text } = Typography

const CalendarCategories = ({ setIsExpanded, date, setDate, goToDate }) => {
  return (
    <Stack gap={2} className='position-relative h-100'>
      <Button
        type="text"
        icon={<RightOutlined style={{ color: '#ccc' }} />}
        className='position-absolute top-0 left-0'
        onClick={() => setIsExpanded(false)}
      />
      <Title level={5} style={{ textAlign: 'center', marginBottom: 5 }}>Welcome, User</Title>
      <SmallCalendar date={date} setDate={setDate} goToDate={goToDate} />
      <Card title="My Categories">
        <CategoryItem color="#ccc" text="Category 1" />
        <CategoryItem color="#ccc" text="Category 2" />
        <CategoryItem color="#ccc" text="Category 2" />
        <CategoryItem color="#ccc" text="Category 2" />
        <CategoryItem color="#ccc" text="Category 2" />
      </Card>
    </Stack>
  )
}

const CategoryItem = ({ color, text }) => {
  return (
    <CategoryItemContainer className="mb-2">
      <CircleIndicator color={color} />
      <Text>{text}</Text>
    </CategoryItemContainer>
  )
}

export default CalendarCategories
