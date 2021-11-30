import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 5px 12px;

  &:hover {
    background-color: #f5f5f5;
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
