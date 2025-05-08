export const AppRoutes = {
	HOME: '/',
	GAME_ROOM: '/game',
	RULES: '/rules',
	NOT_FOUND: '*',
} as const

export const CoinNaminals = {
	COIN150: 150,
	COIN200: 200,
	COIN250: 250,
	COIN300: 300,
	COIN350: 350,
} as const

export const Colors = {
	WHITE: 'white',
	BLACK: 'black',
} as const

export const FigureNames = {
	FIGURE: 'Фигура',
	KING: 'Король',
	QUEEN: 'Ферзь',
	KNIGHT: 'Конь',
	PAWN: 'Пешка',
	ROOK: 'Ладья',
	BISHOP: 'Слон',
} as const

export const Tokens = {
	ACCESS: 'token_auth',
}

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]
export type CoinNaminals = (typeof CoinNaminals)[keyof typeof CoinNaminals]
export type Colors = (typeof Colors)[keyof typeof Colors]
export type FigureNames = (typeof FigureNames)[keyof typeof FigureNames]
