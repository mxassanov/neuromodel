import axios from 'axios';

export default axios.create({
  baseURL: 'https://neuromodels.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
