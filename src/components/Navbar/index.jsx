import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Avatar, Menu, Dropdown } from 'antd'
import moment from 'moment';

import { NavbarContainer, NavbarSide, NavbarCenter, NavbarContent, NavbarContentText } from './components'

const Navbar = ({ calendarRef }) => {
  const now = new Date();


  const [time, setTime] = useState(moment().format('HH:mm:ss'))
  const [monthAndYear, setMonthAndYear] = useState(moment(now))

  console.log({ monthAndYear });

  const todayClicked = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.today()
    setMonthAndYear(moment(now))
  }

  const prevMonthClicked = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.prev()
    setMonthAndYear(prevState => moment(prevState).subtract(1, 'month'))
  }

  const nextMonthClicked = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.next()
    setMonthAndYear(prevState => moment(prevState).add(1, 'month'))
  }

  useEffect(() => {
    setInterval(() => setTime(moment().format('HH:mm:ss')), 1000)
  }, [])

  return (
    <NavbarContainer>
      <NavbarSide>{time}</NavbarSide>
      <NavbarCenter>
        <NavbarContent>
          <Button shape='circle' icon={<LeftOutlined />} onClick={prevMonthClicked} />
          <NavbarContentText>{monthAndYear.format('MMMM yyyy')}</NavbarContentText>
          <Button shape='circle' icon={<RightOutlined />} onClick={nextMonthClicked} />
        </NavbarContent>
      </NavbarCenter>
      <NavbarSide alignRight>
        <Button className='me-3' onClick={todayClicked}>Today</Button>
        <Dropdown overlay={AvatarMenu} placement='bottomRight' trigger={['click']}>
          <Avatar>U</Avatar>
        </Dropdown>
      </NavbarSide>
    </NavbarContainer >
  )
}

const AvatarMenu = (
  <Menu>
    <Menu.Item>
      List 1
    </Menu.Item>
    <Menu.Item>
      List 2
    </Menu.Item>
  </Menu>
)

export default Navbar
