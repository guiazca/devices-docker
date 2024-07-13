import axios from 'axios';

export const API_URL = `http://devices-mgn_app-network:5000/api`;

export const api = axios.create({
    baseURL: API_URL,
  });