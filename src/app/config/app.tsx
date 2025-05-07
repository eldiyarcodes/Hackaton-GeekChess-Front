import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../shared/consts/consts'
import { AuthPage } from '../../pages/auth/AuthPage'
import { GameRoom } from '../../pages/game-room/game-room'

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.HOME} element={<AuthPage />} />
				<Route path={AppRoutes.GAME_ROOM} element={<GameRoom />} />
			</Routes>
		</BrowserRouter>
	)
}
