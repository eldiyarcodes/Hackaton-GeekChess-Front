import type { FC } from 'react'
import logo150 from '../../../../shared/assets/images/geekcoin 150.svg'
import logo200 from '../../../../shared/assets/images/geekcoin 200.svg'
import logo250 from '../../../../shared/assets/images/geekcoin 250.svg'
import logo300 from '../../../../shared/assets/images/geekcoin 300.svg'
import logo350 from '../../../../shared/assets/images/geekcoin 350.svg'
import totalGeekCoins from '../../../../shared/assets/images/total-coins.png'
import { ScoreItem } from '../../../../shared/ui'
import type { IScoreCoins } from '../../../../shared/utils/types'
import { Timer } from '../timer/timer'
import classes from './score-coins.module.scss'

export const ScoreCoins: FC<{ coins: IScoreCoins }> = ({ coins }) => {
	return (
		<div className={classes.lost}>
			<Timer />
			<h3 className={classes.title}>{'SCOREBOARD:'}</h3>
			<div className={classes.lostList}>
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

			<div className={classes.total}>
				<h4>Total:</h4>
				<ScoreItem 
					variant='total'
					logo={totalGeekCoins}
					coins={coins.lotCoin350}
					nominal={350}
					totalScore={coins.totalScore}
				/>
			</div>
		</div>
	)
}
