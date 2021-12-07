import { Menu } from 'antd'
import { useTheme } from 'styled-components'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons'

const ListMenu = ({ onEditClick, onDeleteClick, type, goToDate, destinationDate, ...rest }) => {
  const theme = useTheme()
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
        <Menu.Item icon={<CalendarOutlined style={{ color: theme.fontColor.main }} />} onClick={() => goToDate(moment(destinationDate))} style={menuItemStyle}>
          Show in Calendar
        </Menu.Item>
      )}
      <Menu.Item icon={<EditOutlined style={{ color: theme.fontColor.main }} />} onClick={onEditClick} style={menuItemStyle}>
        Edit {type}
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={onDeleteClick} style={menuItemStyle} danger>
        Delete {type}
      </Menu.Item>
    </Menu>
  )
}

export default ListMenu
