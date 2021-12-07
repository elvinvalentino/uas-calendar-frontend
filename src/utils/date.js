import moment from 'moment';

export const getFormattedDate = date => moment(date).format('DD MMMM YYYY');
export const getFormattedTime = date => moment(date).format('HH:mm');
export const isSameDay = (a, b) => moment(a).isSame(moment(b), 'day');

export const getDateRange = (date, years) => {
  let result = [];
  for (let i = 1; i <= 12 * years; i++) {
    const prev = moment(date).subtract(i, 'month').date(1);
    const next = moment(date).add(i, 'month').date(1);

    result = [prev, ...result, next];
  }

  return result;
};
