import axios from 'axios';
import { useUser } from '../../features/auth/model/use-user';
import { baseURL, Tokens } from '../utils/consts/consts';

export const createApi = () =>
  axios.create({
    baseURL: baseURL,
  });

const $mainApi = createApi();
const $authApi = createApi();

$authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(Tokens.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

$authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(Tokens.ACCESS);
      useUser().clearPlayer();
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export { $authApi, $mainApi };
