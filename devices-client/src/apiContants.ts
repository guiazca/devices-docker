import axios from 'axios';

export const API_URL = `http://192.168.0.100:5000/api`;

export const api = axios.create({
    baseURL: API_URL,
  });