import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export { instance as axios, AxiosError };
export type { AxiosResponse };
