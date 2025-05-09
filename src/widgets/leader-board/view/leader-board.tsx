import { nanoid } from 'nanoid'
import type { FC } from 'react'
import logo from '../../../shared/assets/images/geeks 2.png'
import type { LeaderBoardDto } from '../../../shared/utils/types'
import classes from './leader-board.module.scss'

const users: LeaderBoardDto[] = [
	{ _id: nanoid(), login: 'Geeks Baike', score: 1000 },
	{ _id: nanoid(), login: 'Monica Belucci', score: 900 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 850 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 750 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 600 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 550 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 500 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 250 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 200 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 150 },
]

export const LeaderBoard: FC = () => {
	return (
		<div className={classes.wrapper}>
			<div>
				<img src={logo} alt='geeks logo' className={classes.logo} />
			</div>
			<div className={classes.leaderBoard}>
				<h3>LEADERBOARD:</h3>

				{users.length > 0 ? (
					<ul className={classes.list}>
						{users.map((user, idx) => (
							<li key={user._id} className={classes.player}>
								<p className={classes.login}>
									{idx + 1}. {user.login}
								</p>
								<p className={classes.score}>{user.score}</p>
							</li>
						))}
					</ul>
				) : (
					<p className={classes.notPlayers}>Скоро тут появиться игроки</p>
				)}
			</div>
		</div>
	)
}
