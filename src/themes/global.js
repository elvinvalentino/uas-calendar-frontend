import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f5f5f5 !important;
  }

  .ant-picker-calendar,
  .ant-picker-calendar .ant-picker-panel {
    border-radius: ${p => p.theme.border.radius}px;
  }

  .ant-card-head-title,
  .ant-card-extra {
    padding: 10px 0;
  }
`;
