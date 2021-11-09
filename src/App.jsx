import { useRef, useState } from 'react';
import moment from 'moment'

import Navbar from './components/Navbar'
import Content from './components/Content'
import { GlobalStyles } from './themes/global';

const App = () => {
  const now = new Date();

  const calendarRef = useRef()
  const [date, setDate] = useState(moment(now))
  const [dateSmall, setDateSmall] = useState(moment(now))


  const today = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.today()
    setDate(moment(now))
    setDateSmall(moment(now))
  }

  const prevMonth = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.prev()

    const newDate = moment(date).subtract(1, 'month').date(1)
    setDate(newDate)
    setDateSmall(newDate)
  }

  const nextMonth = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.next()

    const newDate = moment(date).add(1, 'month').date(1)
    setDate(newDate)
    setDateSmall(newDate)
  }

  const goToDate = (date) => {
    date = new Date(date.valueOf())
    const calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(date)
    setDate(moment(date))
    setDateSmall(moment(date))
  }

  return (
    <>
      <GlobalStyles />
      <Navbar
        date={date}
        today={today}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <Content
        calendarRef={calendarRef}
        date={dateSmall}
        setDate={setDateSmall}
        goToDate={goToDate}
      />
    </>
  );
}

export default App;
