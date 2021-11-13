import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { ThemeProvider } from 'styled-components';
import { theme } from './themes/theme';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
