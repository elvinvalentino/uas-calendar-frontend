import { useContext } from 'react'
import { useTheme } from 'styled-components'
import { Stack } from 'react-bootstrap'
import { Button, Typography, Dropdown, Modal } from 'antd'
import { useGoogleLogin } from 'react-google-login';
import { RightOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import Card from '../Core/Card'
import SmallCalendar from '../SmallCalendar'
import ListMenu from '../ListMenu'
import CategoryModal from '../CategoryModal'
import LoadingIndicator from '../LoadingIndicator'
import { CircleIndicator, CategoryItemContainer, CategoryText } from './components'
import { useModal } from '../../hooks/useModal'
import { DataContext } from '../../contexts/data'
import { AuthContext } from '../../contexts/auth'
import { getToken } from '../../utils/getToken'
import Service from '../../utils/Service'
import axios from '../../axios'


const { Title } = Typography

const CalendarCategories = ({ setIsExpanded, date, setDate, goToDate }) => {
  const theme = useTheme()
  return (
    <Stack gap={2} className='position-relative h-100'>
      <Button
        type="text"
        icon={<RightOutlined style={{ color: theme.fontColor.main }} />}
        className='position-absolute top-0 start-0'
        onClick={() => setIsExpanded(false)}
      />
      <Title level={5} style={{ textAlign: 'center', marginBottom: 5 }}>Welcome, User</Title>
      <SmallCalendar date={date} setDate={setDate} goToDate={goToDate} />
      <Categories />
    </Stack>
  )
}

const Categories = () => {
  const { handleClose, handleOpen, isOpen } = useModal()
  const { categories, isFetchData } = useContext(DataContext)
  const theme = useTheme()

  const { login, isAuthenticate } = useContext(AuthContext)

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

  const openModal = () => {
    if (!isAuthenticate) {
      signIn()
      return
    }

    handleOpen()
  }

  return (
    <>
      <CategoryModal
        show={isOpen}
        onHide={handleClose}
        centered
        backdrop='static'
      />
      <Card title="My Categories" onExtraClick={openModal}>
        {!isFetchData && <CategoryItem category={{
          name: 'Holiday in Indonesia',
          hex: theme.color.holiday,
          isPreset: true
        }} />}
        {isFetchData && <LoadingIndicator />}
        {!isFetchData && categories.map(c => (
          <CategoryItem key={c._id} category={c} />
        ))}
      </Card>
    </>
  )
}

const CategoryItem = ({ category }) => {
  const { handleClose, handleOpen, isOpen } = useModal()
  const { deleteData, changeEventColorToPreset } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

  const deleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete this category?`,
      okText: 'Delete',
      cancelText: 'Close',
      okType: 'primary',
      okButtonProps: { danger: true },
      centered: true,
      onOk: async () => {
        if (!isAuthenticate) return
        const token = getToken()
        await Service.deleteCategory(token, category._id)
        deleteData('category', category._id)
        changeEventColorToPreset(category._id)
      }
    })
  }

  return (
    <>
      <CategoryModal
        show={isOpen}
        onHide={handleClose}
        centered
        backdrop='static'
        action='update'
        overrideInitialValues={category}
      />
      <CategoryItemContainer className="mb-2">
        <CircleIndicator color={category.hex} />
        <CategoryText >{category.name}</CategoryText>
        {!category.isPreset && (
          <Dropdown
            overlay={
              <ListMenu onEditClick={handleOpen} onDeleteClick={deleteConfirm} type='category' />
            }
            placement='bottomRight'
            trigger={['click']}
            overlayStyle={{ zIndex: 99999999 }}
          >
            <Button type='text' className='more-indicator' icon={<MoreOutlined style={{ color: '#858585', fontSize: '1.1em' }} />} />
          </Dropdown>
        )}
      </CategoryItemContainer>
    </>
  )
}

export default CalendarCategories
