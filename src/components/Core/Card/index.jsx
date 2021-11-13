import { Card as AntdCard, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTheme } from 'styled-components'

const Card = ({ onExtraClick, ...rest }) => {
  const theme = useTheme();

  const headStyle = {
    padding: '0 1em',
    border: 'none',
    fontWeight: 500
  }

  const bodyStyle = {
    padding: '.5em 1em',
    flex: 1,
    overflow: 'auto'
  }

  return <AntdCard
    style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: theme.border.radius,
      flex: 1,
      overflow: 'hidden',
    }}
    headStyle={headStyle}
    bodyStyle={bodyStyle}
    extra={<CardHeaderExtra onClick={onExtraClick} />}
    {...rest}
  />
}

const CardHeaderExtra = ({ ...rest }) => {
  const style = {
    fontSize: '1.2em'
  }

  return <Button
    type='text'
    style={style}
    icon={
      <PlusOutlined
        style={{ color: '#ccc' }}
      />
    }
    {...rest}
  />
}

export default Card
