import { Card as AntdCard } from 'antd'
import { useTheme } from 'styled-components'

const Card = ({ ...rest }) => {
  const theme = useTheme();

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
    {...rest}
  />
}

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

export default Card
