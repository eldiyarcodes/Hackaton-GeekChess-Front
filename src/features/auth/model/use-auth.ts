import { create } from 'zustand'
import { Tokens } from '../../../shared/utils/consts/consts'

type TUseAuthProps = {
	isAuth: boolean
	signUp: (login: string, telephone: string) => void
	logout: () => void
}

export const useAuth = create<TUseAuthProps>(set => ({
	// isAuth: !!localStorage.getItem(Tokens.ACCESS),
	isAuth: true,
	signUp: async (login, telephone) => {
		
	},
	logout: () => {
		localStorage.removeItem(Tokens.ACCESS)
	},
}))
