import { create } from 'zustand'
import { Tokens } from '../../../shared/utils/consts/consts'

type TUseAuthProps = {
	isAuth: boolean
	signUp: (login: string, telephone: string, redirect: () => void) => void
	logout: (redirectFn: () => void) => void
}

export const useAuth = create<TUseAuthProps>(set => ({
	isAuth: !!localStorage.getItem(Tokens.ACCESS),

	signUp: async (login, telephone, redirect) => {
		localStorage.setItem(Tokens.ACCESS, 'test-token-value')
		set({ isAuth: true })
		redirect()
	},

	logout: redirect => {
		localStorage.removeItem(Tokens.ACCESS)
		set({ isAuth: false })
		redirect()
	},
}))
