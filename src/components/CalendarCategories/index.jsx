import { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { Button, Typography, Dropdown, Modal } from 'antd'
import { RightOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import Card from '../Core/Card'
import SmallCalendar from '../SmallCalendar'
import ListMenu from '../ListMenu'
import CategoryModal from '../CategoryModal'
import LoadingIndicator from '../LoadingIndicator'
import { CircleIndicator, CategoryItemContainer } from './components'
import { useModal } from '../../hooks/useModal'
import { DataContext } from '../../contexts/data'
import { AuthContext } from '../../contexts/auth'
import { getToken } from '../../utils/getToken'
import Service from '../../utils/Service'


const { Title, Text } = Typography

const CalendarCategories = ({ setIsExpanded, date, setDate, goToDate }) => {
  return (
    <Stack gap={2} className='position-relative h-100'>
      <Button
        type="text"
        icon={<RightOutlined style={{ color: '#ccc' }} />}
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

  return (
    <>
      <CategoryModal
        show={isOpen}
        onHide={handleClose}
        centered
        backdrop='static'
      />
      <Card title="My Categories" onExtraClick={handleOpen}>
        {isFetchData && <LoadingIndicator />}
        {!isFetchData && categories.length === 0 && (
          <Text>Category is empty. Press + to add category</Text>
        )}
        {!isFetchData && categories.map(c => (
          <CategoryItem category={c} />
        ))}
      </Card>
    </>
  )
}

const CategoryItem = ({ category }) => {
  const { handleClose, handleOpen, isOpen } = useModal()
  const { deleteData } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

  const deleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete this category?`,
      okText: 'Delete',
      cancelText: 'Close',
      okType: 'danger',
      centered: true,
      onOk: async () => {
        if (!isAuthenticate) return
        const token = getToken()
        await Service.deleteCategory(token, category._id)
        deleteData('category', category._id)
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
        <Text style={{ flex: 1 }}>{category.name}</Text>
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
