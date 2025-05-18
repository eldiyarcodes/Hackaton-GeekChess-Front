import { create } from 'zustand';
import { $authApi } from '../../../shared/api/axios';
import { GAME_MODE } from '../../../shared/utils/consts/consts';
import type { LeaderBoardDto } from '../../../shared/utils/types';

interface State {
  data: LeaderBoardDto[];
  isLoading: boolean;
  getLeaderboards: (filterMode: GAME_MODE) => void;

  filterMode: GAME_MODE;
  setFilterMode: (mode: GAME_MODE) => void;
}
export const useLeaderBoard = create<State>((set, get) => ({
  data: [] as LeaderBoardDto[],
  isLoading: false,

  filterMode: GAME_MODE.RAPID,

  setFilterMode: (filterMode) => set({ filterMode }),

  getLeaderboards: async (mode) => {
    try {
      set({ isLoading: true });
      const { data } = await $authApi.get('score/top-players', {
        params: {
          mode,
        },
      });
      set({ data: data.data });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
