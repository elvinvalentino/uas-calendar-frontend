import { useTheme } from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'


const Calendar = ({ calendarRef }) => {
  const theme = useTheme()

  return <FullCalendar
    ref={calendarRef}
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView='dayGridMonth'
    headerToolbar={false}
    height={`calc(100vh - ${theme.navbarHeight}px - 1em)`}
    selectable
  />

}


export default Calendar
