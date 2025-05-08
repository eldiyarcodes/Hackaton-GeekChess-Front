import type { FC } from 'react'
import totalGeekCoins from '../../../../shared//assets/total-coins.png'
import logo150 from '../../../../shared/assets/geekcoin 150.svg'
import logo200 from '../../../../shared/assets/geekcoin 200.svg'
import logo250 from '../../../../shared/assets/geekcoin 250.svg'
import logo300 from '../../../../shared/assets/geekcoin 300.svg'
import logo350 from '../../../../shared/assets/geekcoin 350.svg'
import type { CoinNaminals } from '../../../../shared/utils/consts/consts'
import classes from './score-coins.module.scss'

export const ScoreCoins: FC<{
	coins: {
		lotCoin150: CoinNaminals[]
		lotCoin200: CoinNaminals[]
		lotCoin250: CoinNaminals[]
		lotCoin300: CoinNaminals[]
		lotCoin350: CoinNaminals[]
		totalScore: number
	}
}> = ({ coins }) => {
	return (
		<div className={classes.lost}>
			<h3 style={{ marginBottom: 30, color: '#fff' }}>{'SCOREBOARD:'}</h3>
			<ul className={classes.lostList}>
				<li>
					<div>
						<img width={30} height={30} src={logo150} alt={'logo150'} />
					</div>
					<p>GeekCoin 150 - {coins.lotCoin150.length}</p>
					<p>{coins.lotCoin150.length * 150}</p>
				</li>
				<li>
					<div>
						<img width={30} height={30} src={logo200} alt={'logo200'} />
					</div>
					<p>GeekCoin200 - {coins.lotCoin200.length}</p>
					<p>{coins.lotCoin200.length * 200}</p>
				</li>
				<li>
					<div>
						<img width={30} height={30} src={logo250} alt={'logo250'} />
					</div>
					<p>GeekCoin250 - {coins.lotCoin250.length}</p>
					<p>{coins.lotCoin250.length * 250}</p>
				</li>
				<li>
					<div>
						<img width={30} height={30} src={logo300} alt={'logo300'} />
					</div>
					<p>GeekCoin300 - {coins.lotCoin300.length}</p>
					<p>{coins.lotCoin300.length * 300}</p>
				</li>
				<li>
					<div>
						<img width={30} height={30} src={logo350} alt={'logo350'} />
					</div>
					<p>GeekCoin350 - {coins.lotCoin350.length}</p>
					<p>{coins.lotCoin350.length * 350}</p>
				</li>
			</ul>

			<div className={classes.total}>
				<h4>Total:</h4>
				<div className={classes.info}>
					<div className={classes.label}>
						<div>
							<img src={totalGeekCoins} alt='total coins' width={72} height={30} />
						</div>
						<p>{'GeekCoins'}</p>
					</div>
					<p className={classes.value}>{coins.totalScore}</p>
				</div>
			</div>
		</div>
	)
}
