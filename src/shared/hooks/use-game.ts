import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GAME_MODE } from '../utils/consts/consts';

type TUseGameProps = {
  isGameOver: boolean;
  gameMode: GAME_MODE;
  startedAt: number | null;
  setGameMode: (mode: GAME_MODE) => void;
  setIsGameOver: (bool: boolean) => void;
  setStartedAt: (time: number | null) => void;
};

export const useGame = create<TUseGameProps>()(
  persist(
    (set) => ({
      isGameOver: false,
      gameMode: GAME_MODE.RAPID,
      startedAt: null,

      setGameMode: (mode) => set({ gameMode: mode }),
      setIsGameOver: (bool) => set({ isGameOver: bool }),
      setStartedAt: (time) => set({ startedAt: time }),
    }),
    {
      name: 'game-storage',
    }
  )
);
