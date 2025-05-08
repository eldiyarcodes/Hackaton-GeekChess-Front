import { create } from 'zustand'
import { Tokens } from '../../../shared/utils/consts/consts'

type TUseAuthProps = {
	isAuth: boolean
	signUp: (login: string, telephone: string) => void
	logout: () => void
}
//Fix me _set нужно позже поменять на set, просто для коммита не подходило
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuth = create<TUseAuthProps>(_set => ({
	// isAuth: !!localStorage.getItem(Tokens.ACCESS),
	isAuth: true,
	signUp: async (/*login, telephone*/) => {
		
	},
	logout: () => {
		localStorage.removeItem(Tokens.ACCESS)
	},
}))
