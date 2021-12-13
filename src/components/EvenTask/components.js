import styled, { css } from 'styled-components';
import { Typography } from 'antd';
const { Text } = Typography;

export const StyledEventTaskItem = styled.div`
  position: relative;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: ${p => p.theme.border.radius}px;
  text-align: left;

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: -1px;
    bottom: -1px;
    width: 12px;
    background-color: ${p => p.color};
    border-radius: ${p => p.theme.border.radius}px;
    z-index: 100;
  }

  &:after {
    content: '';
    position: absolute;
    left: 7px;
    top: -1px;
    bottom: -1px;
    width: 22px;
    background-color: ${p => p.theme.backgroundColor.main};
    border-radius: 10px;
    z-index: 100;
  }
`;

export const StyledEventTaskItemContent = styled.div`
  position: relative;
  display: flex;
  padding: 0.5em 1em;
  padding-right: 0;
  align-items: center;
  z-index: 200;

  & .more-indicator {
    visibility: hidden;
  }

  &:hover .more-indicator {
    visibility: visible;
  }
`;

const indicatorSize = 30;
export const CircleIndicator = styled.div`
  width: ${indicatorSize}px;
  height: ${indicatorSize}px;
  border-radius: 50%;
  border: 2px solid ${p => p.color};
  margin-right: 0.7em;
  ${p =>
    p.checked &&
    css`
      background-color: ${p => p.color};
    `}
`;

export const EventTaskText = styled(Text)`
  ${p =>
    p.isChecked &&
    css`
      text-decoration: line-through;
    `}
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
