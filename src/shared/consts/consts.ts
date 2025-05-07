export const AppRoutes = {
	HOME: '/',
	GAME_ROOM: '/game',
	NOT_FOUND: '*',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const CoinNaminals = {
	COIN150: 150,
	COIN200: 200,
	COIN250: 250,
	COIN300: 300,
	COIN350: 350,
} as const

export type CoinNaminals = (typeof CoinNaminals)[keyof typeof CoinNaminals]

export const Colors = {
	WHITE: 'white',
	BLACK: 'black',
} as const

export type Colors = (typeof Colors)[keyof typeof Colors]

export const FigureNames = {
	FIGURE: 'Фигура',
	KING: 'Король',
	QUEEN: 'Ферзь',
	KNIGHT: 'Конь',
	PAWN: 'Пешка',
	ROOK: 'Ладья',
	BISHOP: 'Слон',
} as const

export type FigureNames = (typeof FigureNames)[keyof typeof FigureNames]
