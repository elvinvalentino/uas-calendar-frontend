import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';

import { AuthProvider } from './contexts/auth';
import { DataProvider } from './contexts/data';
import { ThemeProvider } from './contexts/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
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
