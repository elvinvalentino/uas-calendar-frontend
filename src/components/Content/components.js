import styled, { css } from 'styled-components';

export const ExpandIndicator = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  top: 75px;
  border-radius: 10px;
  ${p =>
    p.position === 'right'
      ? css`
          right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        `
      : css`
          left: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        `}
  width: 15px;
  height: 40px;
  background-color: ${p => p.theme.color.primary};
  cursor: pointer;
`;
