import { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { useTheme } from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { DataContext } from '../../contexts/data'
import Service from '../../utils/Service'
import EventTaskModal from '../EventTaskModal'
import EventDetailModal from '../EventDetailModal'
import { useModal } from '../../hooks/useModal'



const Calendar = ({ calendarRef }) => {
  const now = moment()
  const { events: eventDatas } = useContext(DataContext)
  const [selectedDateRange, setSelectedDateRange] = useState([now, now])
  const [selectedEvent, setSelectedEvent] = useState({})
  const [nationalHolidays, setNationalHolidays] = useState([])

  const { isOpen, handleClose, handleOpen } = useModal()
  const { isOpen: isEventDetailOpen, handleClose: handleEventDetailClose, handleOpen: handleEventDetailOpen } = useModal()
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

  const events = [
    ...nationalHolidays.map(nh => ({
      title: nh.holiday_name,
      start: nh.holiday_date,
      allDay: true,
      color: '#0E743F',
      extendedProps: {
        isPreset: true
      }
    })),
    ...eventDatas.map(e => ({
      title: e.title,
      start: new Date(e.dateStart),
      end: e.isAllDay
        ? new Date(moment(e.dateEnd).add(1, 'day').valueOf())
        : new Date(e.dateEnd),
      allDay: e.isAllDay,
      color: e.category.hex,
      textColor: e.isAllDay ? '#fff' : '#000',
      extendedProps: {
        ...e,
        isPreset: false
      }
    })),
  ]


  return (
    <>
      <EventTaskModal
        title='Add Event'
        show={isOpen}
        onHide={handleClose}
        backdrop='static'
        centered
        overrideInitialValues={{
          type: 'Event',
          dateStart: selectedDateRange[0],
          dateEnd: selectedDateRange[1],
          isAllDay: !selectedDateRange[0].isSame(selectedDateRange[1], 'day')
        }}
      />
      <EventDetailModal
        show={isEventDetailOpen}
        onHide={handleEventDetailClose}
        event={selectedEvent}
        onOpen={handleEventDetailOpen}
        centered
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
        dayMaxEventRows={5}
        dayMaxEvents
        eventClick={info => {
          if (info.event.extendedProps.isPreset) return
          setSelectedEvent(info.event.extendedProps)
          handleEventDetailOpen()
        }}
      />
    </>
  )

}


export default Calendar
