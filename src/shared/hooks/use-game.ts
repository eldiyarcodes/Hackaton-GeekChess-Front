import { create } from 'zustand';
import { GAME_MODE } from '../utils/consts/consts';

type TUseGameProps = {
  isGameOver: boolean;
  gameMode: GAME_MODE;
  setGameMode: (timer: GAME_MODE) => void;
  setIsGameOver: (bool: boolean) => void;
};

export const useGame = create<TUseGameProps>((set) => ({
  isGameOver: false,
  gameMode: GAME_MODE.RAPID,

  setGameMode: (gameMode) => set({ gameMode }),
  setIsGameOver: (isGameOver) => set({ isGameOver }),
}));
