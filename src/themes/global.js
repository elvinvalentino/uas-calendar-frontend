import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${p => p.theme.backgroundColor.canvas} !important;
  }

  .ant-picker-calendar,
  .ant-picker-calendar .ant-picker-panel {
    border-radius: ${p => p.theme.border.radius}px;
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
`;
