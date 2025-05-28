import { AxiosError } from 'axios';
import { create } from 'zustand';
import { $mainApi } from '../../../shared/api/axios';
import { toaster } from '../../../shared/libs/toaster';
import { Tokens } from '../../../shared/utils/consts/consts';
import { type PlayerDto } from './use-user';

type TUseAuthProps = {
  isAuth: boolean;
  isLoading: boolean;
  signUp: (
    login: string,
    telephone: string,
    redirect: () => void,
    setPlayer: (data: PlayerDto | null) => void
  ) => void;
  signIn: (
    login: string,
    telephone: string,
    redirect: () => void,
    setPlayer: (data: PlayerDto | null) => void
  ) => void;
  logout: (
    redirectFn: () => void,
    clearPlayer: () => void,
    setStartedAt: (value: number | null) => void
  ) => void;
};

export const useAuth = create<TUseAuthProps>((set) => ({
  isAuth: !!localStorage.getItem(Tokens.ACCESS),
  isLoading: false,

  signUp: async (login, telephone, redirect, setPlayer) => {
    try {
      set({ isLoading: true });
      const response = await $mainApi.post('auth/sign-up', {
        login,
        telephone,
      });
      if (response.status === 201) {
        const { access_token, player, message } = response.data;
        console.log(response.data);

        localStorage.setItem(Tokens.ACCESS, access_token);
        setPlayer(player);
        toaster('success', message || 'Регистрация прошла успешно!');
        set({ isAuth: true });
        redirect();
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message || 'Ошибка при регистрации';
      toaster('error', message);
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (login, telephone, redirect, setPlayer) => {
    try {
      set({ isLoading: true });
      const response = await $mainApi.post('auth/sign-in', {
        login,
        telephone,
      });
      if (response.status === 201) {
        const { access_token, player, message } = response.data;
        localStorage.setItem(Tokens.ACCESS, access_token);
        setPlayer(player);
        set({ isAuth: true });
        redirect();
        toaster('success', message || 'Авторизация прошла успешно!');
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message || 'Ошибка при авторизации';
      toaster('error', message);
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: (redirect, clearPlayer, setStartedAt) => {
    localStorage.removeItem(Tokens.ACCESS);
    clearPlayer();
    set({ isAuth: false });
    redirect();
    setStartedAt(null);
  },
}));
