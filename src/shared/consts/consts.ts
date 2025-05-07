export const AppRoutes = {
	HOME: '/',
	GAME_ROOM: '/game',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]
