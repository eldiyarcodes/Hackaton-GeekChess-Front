import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../../pages/auth/AuthPage'
import { GameRoom } from '../../pages/game-room/game-room'
import { AppRoutes } from '../../shared/utils/consts/consts'
import { Rules } from '../../pages/rules/Rules'

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.HOME} element={<AuthPage />} />
				<Route path={AppRoutes.RULES} element={<Rules />} />
				<Route path={AppRoutes.GAME_ROOM} element={<GameRoom />} />
				<Route path={AppRoutes.NOT_FOUND} element={<div>Page Not Found</div>} />
			</Routes>
		</BrowserRouter>
	)
}
