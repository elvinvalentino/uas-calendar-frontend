import { useEffect, useState, useContext } from 'react'
import { LeftOutlined, RightOutlined, LogoutOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Avatar, Menu, Dropdown, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons'
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { AuthContext } from '../../contexts/auth'
import { DataContext } from '../../contexts/data'
import moment from 'moment';

import axios from '../../axios'
import { NavbarContainer, NavbarSide, NavbarCenter, NavbarContent, NavbarContentText } from './components'
import { getDateRange } from '../../utils/date';
import { useTheme } from 'styled-components';

const { Text } = Typography

const Navbar = ({ date, prevMonth, nextMonth, today, goToDate }) => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'))
  const { isAuthenticate, login, user, logout } = useContext(AuthContext)
  const { setData } = useContext(DataContext)

  useEffect(() => {
    setInterval(() => setTime(moment().format('HH:mm:ss')), 1000)
  }, [])

  const onLogout = () => {
    setData('event', [])
    setData('category', [])
    logout()
  }


  const responseGoogle = async (response) => {
    if (response.error) return console.log(response)
    const { email, name, imageUrl } = response.profileObj
    const { data } = await axios.post('/api/users', {
      email,
      username: name,
      profilePicture: imageUrl,
    })

    login(data)
  }

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    onSuccess: responseGoogle,
    cookiePolicy: 'single_host_origin'
  })

  return (
    <NavbarContainer>
      <NavbarSide>
        <Text>{time}</Text>
      </NavbarSide>
      <NavbarCenter>
        <NavbarContent>
          <Button shape='circle' icon={<LeftOutlined />} onClick={prevMonth} />
          <NavbarContentText>
            <Dropdown overlay={<DateMenu date={date} goToDate={goToDate} />} trigger={['click']} placement='bottomCenter'>
              <div className='d-flex align-items-center'>
                <Text className='me-1'>{date.format('MMMM yyyy')}</Text>
                <DownOutlined />
              </div>
            </Dropdown>
          </NavbarContentText>
          <Button shape='circle' icon={<RightOutlined />} onClick={nextMonth} />
        </NavbarContent>
      </NavbarCenter>
      <NavbarSide alignRight>
        <Button className={isAuthenticate ? 'me-3' : 'me-2'} onClick={today}>Today</Button>
        {isAuthenticate ? (
          <Dropdown overlay={<AvatarMenu onChangeAccount={signIn} onLogout={onLogout} />} placement='bottomRight' trigger={['click']}>
            <Avatar src={user?.profilePicture} />
          </Dropdown>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            render={props => <Button {...props} type='primary' >Sign in</Button>}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </NavbarSide>
    </NavbarContainer >
  )
}

const AvatarMenu = ({ onChangeAccount, onLogout }) => {
  const theme = useTheme()

  const menuStyle = {
    boxShadow: '1px 3px 5px #ccc'
  }

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const logoutConfirm = () => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to logout?`,
      okText: 'Logout',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk: onLogout
    })
  }

  return (
    <Menu style={menuStyle}>
      <Menu.Item icon={<ReloadOutlined />} onClick={() => onChangeAccount()} style={menuItemStyle}>
        Change account
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={logoutConfirm} style={menuItemStyle} danger>
        Logout
      </Menu.Item>
    </Menu>
  )
}

const DateMenu = ({ date, goToDate }) => {
  const menuStyle = {
    boxShadow: '1px 3px 5px #ccc',
    maxHeight: 300,
    overflow: 'auto'
  }

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const dates = getDateRange(date, 5);

  return (
    <Menu style={menuStyle}>
      {dates.map(d => (
        <Menu.Item key={`${d.format('MMMM YYYY')}`} onClick={() => goToDate(d)} style={menuItemStyle}>
          {d.format('MMMM YYYY')}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default Navbar
