import { nanoid } from 'nanoid'
import logo150 from '../../../shared/assets/geekcoin 150.svg'
import logo200 from '../../../shared/assets/geekcoin 200.svg'
import logo250 from '../../../shared/assets/geekcoin 250.svg'
import logo300 from '../../../shared/assets/geekcoin 300.svg'
import logo350 from '../../../shared/assets/geekcoin 350.svg'

import { CoinNaminals } from '../../../shared/consts/consts'
import type { Cell } from '../../cell/model/cell'

export class Coin {
	id: string
	logo: typeof logo200 | null
	cell: Cell
	naminal: CoinNaminals

	constructor(cell: Cell, naminal: CoinNaminals) {
		this.cell = cell
		this.naminal = naminal
		this.id = nanoid()

		switch (naminal) {
			case CoinNaminals.COIN150:
				this.logo = logo150
				break
			case CoinNaminals.COIN200:
				this.logo = logo200
				break
			case CoinNaminals.COIN250:
				this.logo = logo250
				break
			case CoinNaminals.COIN300:
				this.logo = logo300
				break
			case CoinNaminals.COIN350:
				this.logo = logo350
				break
		}

		this.cell.coin = this
	}
}
