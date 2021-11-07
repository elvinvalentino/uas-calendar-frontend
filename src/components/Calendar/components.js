import styled from 'styled-components';
import { Calendar } from 'antd';

export const StyledCalendar = styled(Calendar)`
  && {
    & .ant-picker-panel .ant-picker-calendar-date-content {
      height: ${p => p.height / 8}px;
    }
  }
`;
