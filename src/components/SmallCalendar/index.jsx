import { Calendar, Button, Typography } from 'antd'
import { useTheme } from 'styled-components'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const { Text } = Typography

const SmallCalendar = ({ date, setDate, goToDate }) => {
  return (
    <Calendar
      fullscreen={false}
      onChange={(value) => goToDate(value)}
      value={date}
      headerRender={({ ...rest }) => <CalendarHeader {...rest} setDate={setDate} />}
    />
  )
}

const CalendarHeader = ({ value, setDate }) => {
  const theme = useTheme()
  const newValue = value.clone()
  const prevMonthOnClick = () => {
    setDate(newValue.subtract(1, 'month').date(1))
  }

  const nextMonthOnClick = () => {
    setDate(newValue.add(1, 'month').date(1))
  }

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <Button type="text" icon={<LeftOutlined style={{ color: theme.fontColor.main }} />} onClick={prevMonthOnClick} />
      <Text>{value.format('MMMM yyyy')}</Text>
      <Button type="text" icon={<RightOutlined style={{ color: theme.fontColor.main }} />} onClick={nextMonthOnClick} />
    </div>
  )
}

export default SmallCalendar
