import axios from 'axios';
import { BASE_URL_BACKEND } from '../data/constants';

export const jsonInstance = axios.create({
  baseURL: BASE_URL_BACKEND,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export const photoInstance = axios.create({
  baseURL: BASE_URL_BACKEND,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true
});