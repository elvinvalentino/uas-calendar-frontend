import styled from 'styled-components';
import { Typography } from 'antd';
const { Text } = Typography;

export const CategoryItemContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: left;

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
  background-color: ${p => p.color};
  border-radius: 25px;
  margin-right: 1em;
`;

export const CategoryText = styled(Text)`
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
