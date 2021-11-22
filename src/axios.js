import axios from 'axios';

export default axios.create({
  baseURL: 'https://uas-calendar-api.herokuapp.com',
});
