import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../../pages/auth/AuthPage'
import { GameRoom } from '../../pages/game-room/game-room'
import { AppRoutes } from '../../shared/utils/consts/consts'
import { Rules } from '../../pages/rules/Rules'
import { AuthorizationGuard } from './auth-guard'

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.HOME} element={<AuthPage />} />
				<Route
					path={AppRoutes.RULES}
					element={
						<AuthorizationGuard>
							<Rules />
						</AuthorizationGuard>
					}
				/>
				<Route
					path={AppRoutes.GAME_ROOM}
					element={
						<AuthorizationGuard>
							<GameRoom />
						</AuthorizationGuard>
					}
				/>
				<Route path={AppRoutes.NOT_FOUND} element={<div>Page Not Found</div>} />
			</Routes>
		</BrowserRouter>
	)
}
