import type { FC } from 'react'
import classes from './leader-board.module.scss'
import logo from '../../../shared/assets/images/geeks 2.png'

export const LeaderBoard: FC = () => {
	return (
		<div className={classes.wrapper}>
			<div>
				<img src={logo} alt="geeks logo" className={classes.logo} />
			</div>
			<div className={classes.leaderBoard}>
				<h3>LEADERBOARD:</h3>
			</div>
		</div>
	)
}
