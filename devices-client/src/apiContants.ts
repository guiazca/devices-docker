import axios from 'axios';

export const API_URL = `http:/app-network:5000/api`;

export const api = axios.create({
    baseURL: API_URL,
  });