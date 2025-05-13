import { create } from 'zustand';
import { $authApi } from '../../../shared/api/axios';
import type { LeaderBoardDto } from '../../../shared/utils/types';

interface IResponse {
  message: string;
  isLoading: boolean;
  data: LeaderBoardDto[];
  fetchScore: (id: string, score: number) => Promise<void>;
}

export const useSendScore = create<IResponse>((set) => ({
  data: [],
  message: '',
  isLoading: false,
  fetchScore: async (id: string, score: number) => {
    try {
      set({ isLoading: true });
      const response = await $authApi.post<IResponse>('score/update-score', {
        id,
        score,
      });
      set({
        data: response.data.data,
        message: response.data.message,
      });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
