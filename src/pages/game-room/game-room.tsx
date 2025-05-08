import { useEffect, useState, type FC } from 'react'
import { BoardComponent } from '../../features/board'
import { Board } from '../../features/board/model/board'
import classes from './game-room.module.scss'
import { ScoreCoins } from '../../entities/score-coins'

export const GameRoom: FC = () => {
	const [board, setBoard] = useState(new Board())

	useEffect(() => {
		restart()
	}, [])

	function restart() {
		const newBoard = new Board()
		newBoard.initCells()
		newBoard.addFigures()
		newBoard.addCoins(5)
		setBoard(newBoard)
	}

	const scoreBoardCoins = {
		lotCoin150: board.lostCoint150,
		lotCoin200: board.lostCoint200,
		lotCoin250: board.lostCoint250,
		lotCoin300: board.lostCoint300,
		lotCoin350: board.lostCoint350,
		totalScore: board.totalScore
	}

	return (
		<div className={classes.room}>
			<BoardComponent board={board} setBoard={setBoard} />
			<ScoreCoins coins={scoreBoardCoins} />
		</div>
	)
}
