import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlayerDto{
  _id: string,
  login: string,
  telephone: string
}

type TUseUserProps = {
  player: PlayerDto | null,
  setPlayer: (player: PlayerDto) => void;
  clearPlayer: () => void;
};
export const useUser = create<TUseUserProps>()(persist<TUseUserProps>((set) => ({
  player: null,
  setPlayer: (player) => set({player}),
  clearPlayer: () => set({player: null}),
}),{name: 'PlayerStorage'}));
