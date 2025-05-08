import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../../pages/auth/auth-page'
import { GameRoom } from '../../pages/game-room/game-room'
import { IntroPage } from '../../pages/intro/intro-page'
import { AppRoutes } from '../../shared/utils/consts/consts'

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.HOME} element={<AuthPage />} />
				<Route path={AppRoutes.INTRO} element={<IntroPage />} />
				<Route path={AppRoutes.GAME_ROOM} element={<GameRoom />} />
				<Route path={AppRoutes.NOT_FOUND} element={<div>Page Not Found</div>} />
			</Routes>
		</BrowserRouter>
	)
}
