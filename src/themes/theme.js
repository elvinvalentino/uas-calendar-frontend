const utilStyles = {
  border: {
    radius: 10,
  },
  navbarHeight: 60,
};

export const lightTheme = {
  type: 'light',
  color: {
    primary: '#1890ff',
    secondary: '#e6f7ff',
    highlight: 'rgba(255,220,40,.15)',
    danger: '#ff4d4f',
    holiday: '#0E743F',
    hover: '#f5f5f5',
  },
  backgroundColor: {
    main: '#fff',
    canvas: '#f5f5f5',
  },
  fontColor: {
    main: '#000',
  },
  borderColor: {
    main: '#d9d9d9',
  },
  fullcalendar: {
    popover: {
      header: {
        backgroundColor: '#d0d0d04d',
      },
      body: {
        backgroundColor: '#fff',
      },
    },
  },
  ...utilStyles,
};

export const darkTheme = {
  type: 'dark',
  color: {
    primary: '#1890ff',
    secondary: '#cccccc26',
    highlight: 'rgba(255,220,40,.15)',
    danger: '#ff4d4f',
    holiday: '#0E743F',
    hover: '#cccccc26',
  },
  backgroundColor: {
    main: '#171717',
    canvas: '#000',
    danger: '#ff4d4f',
  },
  fontColor: {
    main: '#fff',
  },
  borderColor: {
    main: '#d9d9d9',
  },
  fullcalendar: {
    popover: {
      header: {
        backgroundColor: '#2a2828',
        fontColor: '#fff',
      },
      body: {
        backgroundColor: '#171717',
      },
    },
  },
  ...utilStyles,
};
