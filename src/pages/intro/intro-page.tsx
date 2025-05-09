import { useEffect, useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { BoardComponent } from '../../features/board'
import { Board } from '../../features/board/model/board'
import Logo2 from '../../shared/assets/images/geeks 2.png'
import Logo from '../../shared/assets/images/Logo.svg'
import { Modal } from '../../shared/ui/modal/modal'
import { AppRoutes } from '../../shared/utils/consts/consts'
import styles from './intro-page.module.scss'

export const IntroPage: FC = () => {
	const [board, setBoard] = useState(new Board())
	useEffect(() => {
		restart()
	}, [])

	function restart() {
		const newBoard = new Board()
		newBoard.initCells()
		newBoard.addFigures()
		setBoard(newBoard)
	}
	return (
		<>
			<div className={styles.container}>
				<div className={styles.imgContainer}>
					<img src={Logo2} />
				</div>
				<div className={styles.room}>
					<BoardComponent board={board} setBoard={setBoard} />
				</div>
				<Modal
					isOpen={true}
					title='Rules of the game'
					className={styles.customModal}
				>
					<div className={styles.content}>
						<div className={styles.geeks}>
							<span className={styles.name}>GEEKS</span>
							<div className={styles.logoContainer}>
								<img src={Logo} alt='Logo' />
							</div>
						</div>
						<ul className={styles.rules}>
							<li>1. Игрок управляет только конем</li>
							<li>2. На поле появляются GeekCoin</li>
							<li>
								3. Задача: Собрать как можно больше GeekCoin за ограниченное
								число времени
							</li>
							<li>4. Только допустимые ходы коня (буквой “Г”)</li>
						</ul>
					</div>
					<Link className={styles.startButton} to={AppRoutes.GAME_ROOM}>
						Start the game
					</Link>
				</Modal>
			</div>
		</>
	)
}
