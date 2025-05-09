import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo2 from '../../shared/assets/images/geeks 2.png'
import WhiteKnight from '../../shared/assets/images/white-knight.svg'
import { AppRoutes } from '../../shared/utils/consts/consts'
import styles from './auth-page.module.scss'

export const AuthPage: FC = () => {
	const [step, setStep] = useState(0)
	const navigate = useNavigate()

	const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		navigate(AppRoutes.GAME_ROOM)
	}
	useEffect(() => {
		const timers = [setTimeout(() => setStep(1), 2000)]

		return () => timers.forEach(clearTimeout)
	}, [])
	return (
		<div
			className={`${styles.main} ${
				step < 1 ? styles.blackBackground : styles.imageBackground
			}`}
		>
			<AnimatePresence mode='wait'>
				{step < 1 && (
					<motion.div
						key='text'
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 2 }}
					>
						<img src={Logo2} alt='logo' />
					</motion.div>
				)}
			</AnimatePresence>
			{step >= 1 && (
				<div className={styles.auth}>
					<div className={styles.imageContainer}>
						<img src={Logo2} alt='logo 2' />
					</div>
					<div className={styles.imageWithName}>
						<div className={styles.KnightContainer}>
							<img src={WhiteKnight} alt='knight' />
						</div>
						<div className={styles.parallelogram}>
							<h2>Knight Dash</h2>
						</div>
					</div>
					<div className={styles.registration}>
						<h3>Registration</h3>
						<form onSubmit={e => handleClick(e)}>
							<label htmlFor='name'>Name:</label>
							<input id='name' type='text' placeholder='Name' />
							<label htmlFor='phoneNumber'>Phone number:</label>
							<input id='phoneNumber' type='tel' placeholder='Phone number' />
							<input type='submit' value='Sign Up' />
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
