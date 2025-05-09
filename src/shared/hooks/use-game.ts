import { create } from 'zustand'

type TUseGameProps = {
	isGameOver: boolean
	setIsGameOver: (bool: boolean) => void
}

export const useGame = create<TUseGameProps>(set => ({
	isGameOver: false,
	setIsGameOver: isGameOver => set({ isGameOver }),
}))
