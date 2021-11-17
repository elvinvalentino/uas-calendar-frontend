import { useState } from 'react'
import moment from 'moment'
import { useTheme } from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import EventTaskModal from '../EventTaskModal'
import { useModal } from '../../hooks/useModal'


const Calendar = ({ calendarRef }) => {
  const now = moment()
  const { isOpen, handleClose, handleOpen } = useModal()
  const [selectedDateRange, setSelectedDateRange] = useState([now, now])
  const theme = useTheme()

  // const onDateClick = ({ date }) => {
  //   console.log('click');
  //   date = moment(date)
  //   setSelectedDateRange([date, date])
  //   handleOpen()
  // }

  const onSelect = ({ start, end }) => {
    console.log('onSelect');
    start = moment(start)
    end = moment(end).subtract(1, 'day')
    setSelectedDateRange([start, end])
    handleOpen()
  }

  console.log(selectedDateRange[0].valueOf(), selectedDateRange[1].valueOf());


  return (
    <>
      <EventTaskModal
        title='Add Event'
        show={isOpen}
        onHide={handleClose}
        overrideInitialValues={{
          type: 'Event',
          dateStart: selectedDateRange[0],
          dateEnd: selectedDateRange[1],
          isAllDay: !selectedDateRange[0].isSame(selectedDateRange[1], 'day')
        }}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={false}
        height={`calc(100vh - ${theme.navbarHeight}px - 1em)`}
        select={onSelect}
        selectable
      />
    </>
  )

}


export default Calendar
