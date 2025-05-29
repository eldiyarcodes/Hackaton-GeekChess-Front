import { AxiosError } from 'axios';
import { toast } from 'sonner';
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
        toast.success(message || 'Регистрация прошла успешно!');
        set({ isAuth: true });
        redirect();
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data?.message || 'Ошибка при регистрации');
      }
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
        toast.success(message || 'Авторизация прошла успешно!');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data?.message || 'Ошибка при авторизации');
      }
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
