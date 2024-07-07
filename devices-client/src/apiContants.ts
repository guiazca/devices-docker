import axios from 'axios';
import getLocalIp from './getLocalIp';

export const API_URL = `http://${getLocalIp()}:5000/api`;
console.log(API_URL);

export const api = axios.create({
    baseURL: API_URL,
  });