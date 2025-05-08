import { Coin } from '../../../entities/coin/model/coin'
import { CoinNaminals, Colors } from '../../../shared/utils/consts/consts'
import { Cell } from '../../cell/model/cell'
import { Knight } from '../../figures/model/knight'

export class Board {
	cells: Cell[][] = []
	lostCoint150: CoinNaminals[] = []
	lostCoint200: CoinNaminals[] = []
	lostCoint250: CoinNaminals[] = []
	lostCoint300: CoinNaminals[] = []
	lostCoint350: CoinNaminals[] = []

	private getRandomEmptyCell(): Cell | null {
		const flatCells = this.cells.flat()
		const emptyCells = flatCells.filter(cell => !cell.figure && !cell.coin)

		if (emptyCells.length === 0) {
			return null
		}

		const randomIndex = Math.floor(Math.random() * emptyCells.length)

		return emptyCells[randomIndex]
	}

	private getRandomNaminal(): CoinNaminals {
		const naminals = Object.values(CoinNaminals)
		const randomIndex = Math.floor(Math.random() * naminals.length)

		return naminals[randomIndex]
	}

	public addCoins(count = 10) {
		for (let i = 0; i < count; i++) {
			const cell = this.getRandomEmptyCell()
			if (!cell) break

			const coin = new Coin(cell, this.getRandomNaminal())
			cell.coin = coin
		}
	}

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = []

			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null, null))
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null, null))
				}
			}

			this.cells.push(row)
		}
	}

	public getCopyBoard(): Board {
		const newBoard = new Board()
		newBoard.cells = this.cells

		newBoard.lostCoint150 = this.lostCoint150
		newBoard.lostCoint200 = this.lostCoint200
		newBoard.lostCoint250 = this.lostCoint250
		newBoard.lostCoint300 = this.lostCoint300
		newBoard.lostCoint350 = this.lostCoint350

		return newBoard
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i]

			for (let j = 0; j < row.length; j++) {
				const target = row[j]
				target.available = !!selectedCell?.figure?.canMove(target)
			}
		}
	}

	clearHighlights() {
		this.cells.forEach(row =>
			row.forEach(cell => {
				cell.available = false
			})
		)
	}

	public moveFigure(from: Cell, to: Cell) {
		if (from.figure && from.figure.canMove(to)) {
			from.figure.moveFigure(to)
			from.figure = null

			if (to.coin) {
				switch (to.coin.naminal) {
					case CoinNaminals.COIN150:
						this.lostCoint150.push(to.coin.naminal)
						break
					case CoinNaminals.COIN200:
						this.lostCoint200.push(to.coin.naminal)
						break
					case CoinNaminals.COIN250:
						this.lostCoint250.push(to.coin.naminal)
						break
					case CoinNaminals.COIN300:
						this.lostCoint300.push(to.coin.naminal)
						break
					case CoinNaminals.COIN350:
						this.lostCoint350.push(to.coin.naminal)
						break
				}

				to.coin = null

				const newCell = this.getRandomEmptyCell()
				if (newCell) {
					const newCoin = new Coin(newCell, this.getRandomNaminal())
					newCell.coin = newCoin
				}
			}
		}
	}

	get totalScore(): number {
		return (
			this.lostCoint150.length * 150 +
			this.lostCoint200.length * 200 +
			this.lostCoint250.length * 250 +
			this.lostCoint300.length * 300 +
			this.lostCoint350.length * 350
		)
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x]
	}

	private addKnights() {
		new Knight(Colors.BLACK, this.getCell(0, 7))
	}

	public addFigures() {
		this.addKnights()
		// ..
	}
}
