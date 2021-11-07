import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { StyledCalendar } from './components'

const Calendar = () => {
  const { height } = useWindowDimensions()

  return <StyledCalendar headerRender={() => null} height={height} />

}

export default Calendar
