import { create } from 'zustand';
import {  Tokens } from '../../../shared/utils/consts/consts';
import { requester } from '../../../shared/api/axios';
import { type PlayerDto } from './use-user';

type TUseAuthProps = {
  isAuth: boolean;
  isLoading: boolean;
  signUp: (login: string, telephone: string, redirect: () => void, setPlayer: (data: PlayerDto | null) => void) => void;
  logout: (redirectFn: () => void, clearPlayer: () => void) => void;
};

export const useAuth = create<TUseAuthProps>((set) => ({
  isAuth: !!localStorage.getItem(Tokens.ACCESS),
  isLoading: false,
  signUp: async (login, telephone, redirect, setPlayer ) => {
    try {
      const response = await requester.post('auth/sign-up', {
        login,
        telephone,
      });
      if (response.status === 200) {
        localStorage.setItem(Tokens.ACCESS, response.data?.token);
				setPlayer(response.data?.player);
        set({ isAuth: true });
        redirect();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },

  logout: (redirect, clearPlayer) => {
    localStorage.removeItem(Tokens.ACCESS);
		clearPlayer();
    set({ isAuth: false });
    redirect();
  },
}));
