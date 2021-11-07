import { Radio } from 'antd'

const CalendarHeader = ({ type, onTypeChange }) => {
  return (
    <div>
      <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
        <Radio.Button value="month">Month</Radio.Button>
        <Radio.Button value="year">Year</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default CalendarHeader
