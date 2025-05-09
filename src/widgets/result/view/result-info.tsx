import { nanoid } from 'nanoid'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/model/use-auth'
import logo150 from '../../../shared/assets/images/geekcoin 150.svg'
import logo200 from '../../../shared/assets/images/geekcoin 200.svg'
import logo250 from '../../../shared/assets/images/geekcoin 250.svg'
import logo300 from '../../../shared/assets/images/geekcoin 300.svg'
import logo350 from '../../../shared/assets/images/geekcoin 350.svg'
import totalGeekCoins from '../../../shared/assets/images/total-coins.png'
import { ScoreItem } from '../../../shared/ui'
import { AppRoutes } from '../../../shared/utils/consts/consts'
import type { IScoreCoins, LeaderBoardDto } from '../../../shared/utils/types'
import classes from './result-info.module.scss'

const players: LeaderBoardDto[] = [
	{ _id: nanoid(), login: 'Geeks Baike', score: 1000 },
	{ _id: nanoid(), login: 'Monica Belucci', score: 900 },
	{ _id: nanoid(), login: 'Leonardo DiCaprio', score: 850 },
]

export const ResultInfo: FC<{ coins: IScoreCoins }> = ({ coins }) => {
	const navigate = useNavigate()
	const logout = useAuth(s => s.logout)

	return (
		<div className={classes.result}>
			<h3>Results</h3>

			<div className={classes.score}>
				<p className={classes.title}>score:</p>
				<div className={classes.scoreList}>
					<ScoreItem
						variant='total'
						logo={totalGeekCoins}
						coins={coins.lotCoin350}
						nominal={350}
						totalScore={coins.totalScore}
					/>
					<ScoreItem
						variant='single'
						nominal={150}
						coins={coins.lotCoin150}
						logo={logo150}
					/>
					<ScoreItem
						variant='single'
						nominal={200}
						coins={coins.lotCoin200}
						logo={logo200}
					/>
					<ScoreItem
						variant='single'
						nominal={250}
						coins={coins.lotCoin250}
						logo={logo250}
					/>
					<ScoreItem
						variant='single'
						nominal={300}
						coins={coins.lotCoin300}
						logo={logo300}
					/>
					<ScoreItem
						variant='single'
						nominal={350}
						coins={coins.lotCoin350}
						logo={logo350}
					/>
				</div>
			</div>

			<div className={classes.leaders}>
				<p className={classes.title}>leaderboard:</p>
				<ul className={classes.list}>
					{players.map((user, idx) => (
						<li key={user._id} className={classes.player}>
							<p className={classes.login}>
								{idx + 1}. {user.login}
							</p>
							<p className={classes.score}>{user.score}</p>
						</li>
					))}
				</ul>
			</div>

			<div className={classes.btns}>
				<button
					onClick={() => navigate(AppRoutes.INTRO)}
					type='button'
					className={classes.restart}
				>
					Restart
				</button>
				<button onClick={() => logout()} type='button' className={classes.quit}>
					Quit
				</button>
			</div>
		</div>
	)
}
