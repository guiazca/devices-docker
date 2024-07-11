import axios from 'axios';

export const API_URL = `http://localhost:5001/api`;

export const api = axios.create({
    baseURL: API_URL,
  });