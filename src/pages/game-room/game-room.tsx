import { useEffect, useState, type FC } from 'react'
import { ScoreCoins } from '../../entities/score-coins'
import { BoardComponent } from '../../features/board'
import { Board } from '../../features/board/model/board'
import { useGame } from '../../shared/hooks/use-game'
import { Modal } from '../../shared/ui'
import { LeaderBoard } from '../../widgets/leader-board'
import { ResultInfo } from '../../widgets/result'
import classes from './game-room.module.scss'

export const GameRoom: FC = () => {
	const [board, setBoard] = useState(new Board())
	const isGameOver = useGame(state => state.isGameOver)

	useEffect(() => {
		restart()
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			setBoard(prev => {
				const newLevel = prev.getCoinLevel() + 1
				prev.setCoinLevel(newLevel)

				return Object.assign(new Board(), prev)
			})
		}, 10000)

		return () => clearInterval(interval)
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
		totalScore: board.totalScore,
	}

	return (
		<div className={classes.room}>
			<div className={classes.container}>
				<LeaderBoard />
				<BoardComponent board={board} setBoard={setBoard} />
				<ScoreCoins coins={scoreBoardCoins} />
			</div>
			<Modal isOpen={isGameOver}>
				<ResultInfo coins={scoreBoardCoins} />
			</Modal>
		</div>
	)
}
