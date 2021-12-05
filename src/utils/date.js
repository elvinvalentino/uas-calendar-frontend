import moment from 'moment';

export const getFormattedDate = date => moment(date).format('DD MMMM YYYY');
export const getFormattedTime = date => moment(date).format('HH:mm');
export const isSameDay = (a, b) => moment(a).isSame(moment(b), 'day');
