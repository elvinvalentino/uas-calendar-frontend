import styled from 'styled-components';

export const CategoryItemContainer = styled.div`
  display: flex;
  align-items: center;

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
