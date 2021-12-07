import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './themes/theme';

import { AuthProvider } from './contexts/auth';
import { DataProvider } from './contexts/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <DataProvider>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <App />
          </LocalizationProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
