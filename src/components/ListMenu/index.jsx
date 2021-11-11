import { Menu } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const ListMenu = ({ onEditClick, onDeleteClick, type }) => {
  const menuStyle = {
    boxShadow: '1px 3px 5px #ccc'
  }

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Menu style={menuStyle}>
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
