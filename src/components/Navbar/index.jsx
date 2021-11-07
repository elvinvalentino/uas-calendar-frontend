import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Avatar, Menu, Dropdown } from 'antd'
import moment from 'moment';

import { NavbarContainer, NavbarSide, NavbarCenter, NavbarContent, NavbarContentText } from './components'

const Navbar = () => {
  const [date, setDate] = useState(moment().format('HH:mm:ss'))

  useEffect(() => {
    setInterval(() => setDate(moment().format('HH:mm:ss')), 1000)
  }, [])

  return (
    <NavbarContainer>
      <NavbarSide>{date}</NavbarSide>
      <NavbarCenter>
        <NavbarContent>
          <Button shape='circle' icon={<LeftOutlined />} />
          <NavbarContentText>November 2021</NavbarContentText>
          <Button shape='circle' icon={<RightOutlined />} />
        </NavbarContent>
      </NavbarCenter>
      <NavbarSide alignRight>
        <Button className='me-3'>Today</Button>
        <Dropdown overlay={AvatarMenu} placement='bottomRight' trigger={['click']}>
          <Avatar>U</Avatar>
        </Dropdown>
      </NavbarSide>
    </NavbarContainer>
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
