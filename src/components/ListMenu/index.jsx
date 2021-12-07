import { Menu } from 'antd'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons'

const ListMenu = ({ onEditClick, onDeleteClick, type, goToDate, destinationDate, ...rest }) => {
  const menuStyle = {
    boxShadow: '1px 3px 5px #ccc'
  }

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Menu style={menuStyle} {...rest}>
      {['task', 'event'].includes(type) && (
        <Menu.Item icon={<CalendarOutlined />} onClick={() => goToDate(moment(destinationDate))} style={menuItemStyle}>
          Show in Calendar
        </Menu.Item>
      )}
      <Menu.Item icon={<EditOutlined />} onClick={onEditClick} style={menuItemStyle}>
        Edit {type}
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={onDeleteClick} style={menuItemStyle} danger>
        Delete {type}
      </Menu.Item>
    </Menu>
  )
}

export default ListMenu
