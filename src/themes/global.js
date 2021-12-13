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

  .fc .fc-scrollgrid-liquid,
  .ant-picker-body {
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

  .fc-daygrid-dot-event .fc-event-time,
  .fc-daygrid-dot-event .fc-event-title {
    color: ${p => p.theme.fontColor.main}
  }

  .ant-radio-button-wrapper:last-child {
    border-radius: 0 ${p => p.theme.border.radius}px  ${p =>
  p.theme.border.radius}px 0;
  }

  .ant-card,
  .ant-picker-calendar,
  .ant-picker-body,
  .ant-select-dropdown,
  .ant-dropdown-menu,
  .ant-menu,
  .ant-modal-content {
    background-color: ${p => p.theme.backgroundColor.main};
  }

  .ant-card-bordered {
    border: none;
  }

  .ant-dropdown-menu-item.ant-dropdown-menu-item-danger .ant-dropdown-menu-title-content {
    color: ${p => p.theme.fontColor.danger}
  }

  h1.ant-typography,
  h2.ant-typography,
  h3.ant-typography,
  h4.ant-typography,
  h5.ant-typography,
  h6.ant-typography,
  .ant-modal-confirm-body .ant-modal-confirm-title,
  .ant-modal-confirm-body .ant-modal-confirm-content,
  .ant-typography,
  .ant-typography.ant-typography-secondary,
  .ant-card-head-title,
  .ant-picker-body,
  .ant-picker-calendar-date-value,
  .ant-picker-content thead tr th,
  .ant-form-item-label label,
  .ant-input,
  .ant-picker-input input,
  .ant-checkbox-wrapper span,
  .ant-radio-button-wrapper span,
  .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-danger) .ant-dropdown-menu-title-content,
  .ant-menu-item:not(.ant-menu-item-danger),
  .ant-btn:not(.ant-btn-primary):not(.ant-btn-dangerous) span {
    color: ${p => p.theme.fontColor.main}
  }

  .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value {
    color: #fff;
  }

  .ant-input,
  .ant-picker,
  .ant-select:not(.ant-select-customize-input) .ant-select-selector,
  .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input, 
  .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper, 
  .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover, 
  .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover,
  .ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector,
  .ant-radio-button-wrapper,
  .ant-btn,
  .ant-btn:not(.ant-btn-primary):not(.ant-btn-dangerous):hover,
  .ant-btn:active,
  .ant-btn:focus {
    background: transparent;
  }

  .ant-btn:active,
  .ant-btn:focus {
    border-color: ${p => p.theme.borderColor.main};
  }

  .ant-btn:not(.ant-btn-primary):not(.ant-btn-dangerous):hover span{
    color: ${p => p.theme.color.primary}
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background-color: ${p => p.theme.color.primary};
  }
  
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) span {
    color: #fff
  }

  .ant-select-item:hover,
  .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-danger):hover,
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-danger.ant-menu-item-selected,
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,
  .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner {
    background-color:${p => p.theme.color.hover};
  }

  .ant-btn.ant-btn-primary {
    background-color: ${p => p.theme.color.primary}
  }

  /* bootstrap override */
  .modal{
    z-index: 999999;
  }

  .modal-content {
    border-radius: ${p => p.theme.border.radius}px;
    background-color: ${p => p.theme.backgroundColor.main};
  }

  .modal-title,
  .btn-close {
    color: ${p => p.theme.fontColor.main}
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
