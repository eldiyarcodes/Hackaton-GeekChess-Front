import { useEffect, useState, type FC } from 'react'
import { BoardComponent } from '../../features/board'
import { Board } from '../../features/board/model/board'
import classes from './game-room.module.scss'

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

	return (
		<div className={classes.room}>
			<BoardComponent board={board} setBoard={setBoard} />
		</div>
	)
}
