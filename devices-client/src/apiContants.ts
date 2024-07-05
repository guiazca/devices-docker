import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://devicesapi:5000/api',
  });