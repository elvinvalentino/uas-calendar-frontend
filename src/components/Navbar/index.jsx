import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Avatar, Menu, Dropdown } from 'antd'
import moment from 'moment';

import { NavbarContainer, NavbarSide, NavbarCenter, NavbarContent, NavbarContentText } from './components'

const Navbar = ({ date, prevMonth, nextMonth, today }) => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'))

  useEffect(() => {
    setInterval(() => setTime(moment().format('HH:mm:ss')), 1000)
  }, [])

  return (
    <NavbarContainer>
      <NavbarSide>{time}</NavbarSide>
      <NavbarCenter>
        <NavbarContent>
          <Button shape='circle' icon={<LeftOutlined />} onClick={prevMonth} />
          <NavbarContentText>{date.format('MMMM yyyy')}</NavbarContentText>
          <Button shape='circle' icon={<RightOutlined />} onClick={nextMonth} />
        </NavbarContent>
      </NavbarCenter>
      <NavbarSide alignRight>
        <Button className='me-3' onClick={today}>Today</Button>
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
