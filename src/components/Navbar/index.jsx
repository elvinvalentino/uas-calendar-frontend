import { useEffect, useState, useContext } from 'react'
import { LeftOutlined, RightOutlined, LogoutOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Avatar, Menu, Dropdown } from 'antd'
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { AuthContext } from '../../contexts/auth'
import moment from 'moment';

import axios from '../../axios'

import { NavbarContainer, NavbarSide, NavbarCenter, NavbarContent, NavbarContentText } from './components'

const Navbar = ({ date, prevMonth, nextMonth, today }) => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'))
  const { isAuthenticate, login, user, logout } = useContext(AuthContext)


  const responseGoogle = async (response) => {
    if (response.error) return console.log(response)
    const { email, name, imageUrl } = response.profileObj
    const { data } = await axios.post('/api/users', {
      email,
      username: name,
      profilePicture: imageUrl,
    })

    console.log(data);

    login(data)
  }

  const { signIn } = useGoogleLogin({
    clientId: "367889718299-r8a36bssman2cel7v1usmun7neoatcni.apps.googleusercontent.com",
    onSuccess: responseGoogle
  })

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
        <Button className={isAuthenticate ? 'me-3' : 'me-2'} onClick={today}>Today</Button>
        {isAuthenticate ? (
          <Dropdown overlay={<AvatarMenu onChangeAccount={signIn} onLogout={logout} />} placement='bottomRight' trigger={['click']}>
            <Avatar src={user?.profilePicture} />
          </Dropdown>
        ) : (
          <GoogleLogin
            clientId="367889718299-r8a36bssman2cel7v1usmun7neoatcni.apps.googleusercontent.com"
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
  const menuStyle = {
    boxShadow: '1px 3px 5px #ccc'
  }

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Menu style={menuStyle}>
      <Menu.Item icon={<ReloadOutlined />} onClick={() => onChangeAccount()} style={menuItemStyle}>
        Change account
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={onLogout} style={menuItemStyle} danger>
        Logout
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
