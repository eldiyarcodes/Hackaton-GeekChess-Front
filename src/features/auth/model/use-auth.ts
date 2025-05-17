import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { $mainApi } from '../../../shared/api/axios';
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
  logout: (redirectFn: () => void, clearPlayer: () => void) => void;
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
      if (response.status === 200) {
        const { token, player, message } = response.data;

        localStorage.setItem(Tokens.ACCESS, token);
        setPlayer(player);
        toast.success(message || 'Регистрация прошла успешно!');
        set({ isAuth: true });
        redirect();
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message || 'Ошибка при регистрации';
      toast.error(message);
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
      if (response.status === 200) {
        const { token, player, message } = response.data;
        localStorage.setItem(Tokens.ACCESS, token);
        setPlayer(player);
        toast.success(message || 'Авторизация прошла успешно!');
        set({ isAuth: true });
        redirect();
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      const message = err?.response?.data?.message || 'Ошибка при авторизации';
      toast.error(message);
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: (redirect, clearPlayer) => {
    localStorage.removeItem(Tokens.ACCESS);
    clearPlayer();
    set({ isAuth: false });
    redirect();
  },
}));
