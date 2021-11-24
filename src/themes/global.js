import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${p => p.theme.backgroundColor.canvas} !important;
  }

  /* antd override */
  .ant-picker-calendar,
  .ant-picker-calendar .ant-picker-panel,
  .ant-input,
  .ant-picker,
  .ant-btn,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
    border-radius: ${p => p.theme.border.radius}px;
  }

  .ant-btn.ant-btn-circle {
    border-radius: 50%;
  }

  .ant-card-head-title,
  .ant-card-extra {
    padding: 10px 0;
  }

  .fc {
    border-radius: ${p => p.theme.border.radius}px;
    background-color: ${p => p.theme.backgroundColor.main};
  }

  .fc .fc-scrollgrid-liquid {
    border-radius: ${p => p.theme.border.radius}px;
  }

  .fc-scrollgrid-sync-inner {
    text-align: right;
  }

  .fc-daygrid-day-number,
  .fc-col-header-cell-cushion  {
    color:  ${p => p.theme.fontColor.main};
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: ${p => p.theme.color.secondary};
  }

  .fc .fc-highlight {
    background-color: ${p => p.theme.color.highlight};
  }

  .ant-radio-button-wrapper:first-child {
    border-radius: ${p => p.theme.border.radius}px 0 0  ${p =>
  p.theme.border.radius}px;
  }

  .ant-radio-button-wrapper:last-child {
    border-radius: 0 ${p => p.theme.border.radius}px  ${p =>
  p.theme.border.radius}px 0;
  }
  /* bootstrap override */
  .modal-content {
    border-radius: ${p => p.theme.border.radius}px;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
    /* 0065c3 */
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;
