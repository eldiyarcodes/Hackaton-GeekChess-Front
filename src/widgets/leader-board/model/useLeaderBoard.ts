import { create } from 'zustand';
import { $authApi } from '../../../shared/api/axios';
import type { LeaderBoardDto } from '../../../shared/utils/types';

interface State {
  data: LeaderBoardDto[];
  fetchData: () => void;
  isLoading: boolean;
}
export const useLeaderBoard = create<State>((set) => ({
  data: [] as LeaderBoardDto[],
  isLoading: false,
  fetchData: async () => {
    try {
      set({ isLoading: true });
      const { data } = await $authApi.get('score/top-players');
      set({ data: data.data });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
