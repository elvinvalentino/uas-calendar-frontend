import { useRef, useState, useEffect, useContext } from 'react';
import moment from 'moment'

import Navbar from './components/Navbar'
import Content from './components/Content'
import { DataContext } from './contexts/data'
import { AuthContext } from './contexts/auth'
import { GlobalStyles } from './themes/global';
import Service from './utils/Service'
import { getToken } from './utils/getToken';

const App = () => {
  const now = new Date();
  const { setData, setIsFetchData } = useContext(DataContext)
  const { isAuthenticate, user } = useContext(AuthContext)

  const calendarRef = useRef()
  const [date, setDate] = useState(moment(now))
  const [dateSmall, setDateSmall] = useState(moment(now))

  useEffect(() => {
    if (isAuthenticate) {
      console.log('fetch');
      (async () => {
        try {
          setIsFetchData(true)
          const token = getToken()
          const [categories, events] = await Promise.all([Service.fetchCategory(token), Service.fetchEvent(token)])
          setData('category', categories)
          setData('event', events)
          setIsFetchData(false)
        } catch (err) {
          console.log(err)
        }
      })()
    }
  }, [setData, isAuthenticate, setIsFetchData, user._id])

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
