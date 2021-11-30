import { useState, useEffect } from 'react'
import moment from 'moment'
import { useTheme } from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import Service from '../../utils/Service'
import EventTaskModal from '../EventTaskModal'
import { useModal } from '../../hooks/useModal'


const Calendar = ({ calendarRef }) => {
  const now = moment()
  const [selectedDateRange, setSelectedDateRange] = useState([now, now])
  const [nationalHolidays, setNationalHolidays] = useState([])

  const { isOpen, handleClose, handleOpen } = useModal()
  const theme = useTheme()

  useEffect(() => {
    console.log('fetch');
    (async () => {
      try {
        const response = await Service.fetchNationalHoliday()
        setNationalHolidays(response)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])


  const onSelect = ({ start, end }) => {
    console.log('onSelect');
    start = moment(start)
    end = moment(end).subtract(1, 'day')
    setSelectedDateRange([start, end])
    handleOpen()
  }

  console.log(nationalHolidays)

  const events = [
    ...nationalHolidays.map(nh => ({
      title: nh.holiday_name,
      start: nh.holiday_date,
      allDay: true,
      backgroundColor: '#0E743F',
    })),
    {
      title: 'event1',
      start: '2021-11-01 12:00',
      allDay: true
    },
    {
      title: 'event2',
      start: '2021-11-05',
      end: '2021-11-07'
    },
    {
      title: 'event3',
      start: '2021-11-09T12:30:00',
    }
  ]


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
        events={events}
      />
    </>
  )

}


export default Calendar
