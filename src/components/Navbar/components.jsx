import styled from 'styled-components';
import { css } from 'styled-components'
import { Typography } from 'antd'
const { Text } = Typography


export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${p => p.theme.navbarHeight};
  padding: 1em;
  margin-bottom: 1em;
  background-color: #fff;
  box-shadow: 1px 1px 10px #ccc;
`;

export const NavbarSide = styled.div`
  display: flex;
  align-items: center;
  flex: 1
  ${p => p.alignRight && css`
    justify-content: flex-end
  `}
`

export const NavbarCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 8;
`

export const NavbarContent = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavbarContentText = styled(Text)`
`