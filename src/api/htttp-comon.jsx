import axios from 'axios';
import { PORT_BACKEND } from '../data/constants';

const instance = axios.create({
  baseURL: `http://localhost:${PORT_BACKEND}/api`,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default instance;