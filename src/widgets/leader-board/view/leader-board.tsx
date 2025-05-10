import { useEffect, type FC } from 'react'
import classes from './leader-board.module.scss'
import { useLeaderBoard } from '../model/useLeaderBoard'
import clsx from 'clsx';
import { useUser } from '../../../features/auth/model/use-user';

export const LeaderBoard: FC = () => {
	const {data, fetchData} = useLeaderBoard();
	const {player} = useUser();
	useEffect(() => {
		fetchData();
	},[])
	return (
		<div className={classes.wrapper}>
			<div className={classes.leaderBoard}>
				<h3>LEADERBOARD:</h3>

				{data?.length > 0 ? (
					<ul className={classes.list}>
						{data?.map((user, idx) => (
							<li key={user._id} className={classes.player}>
								<p className={classes.login}>
									{idx + 1}. <span className={clsx(user._id === player?._id && classes.itsMe)}>{user.login}</span>
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
