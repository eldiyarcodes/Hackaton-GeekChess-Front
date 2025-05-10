import { AnimatePresence, motion } from 'framer-motion'
import { useReducer, useRef, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/model/use-auth'
import Logo2 from '../../shared/assets/images/geeks 2.png'
import WhiteKnight from '../../shared/assets/images/white-knight.svg'
import { AppRoutes } from '../../shared/utils/consts/consts'
import styles from './auth-page.module.scss'
import { MultiContainer } from '../../shared/ui/multi-container/MultiContainer'
import { useMediaQuery } from '../../shared/hooks/use-media-query'
import { useUser, type PlayerDto } from '../../features/auth/model/use-user'

export const AuthPage: FC = () => {
	const [name, setName] = useState('');
	const isMobile = useMediaQuery('(max-width: 414px)');
	const [phone, setPhone] = useState('');
	const [errors, setErrors] = useState({ name: '', phone: '' });
	const ref = useRef(0);
	const hasRun = useRef(false);
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const navigate = useNavigate();
	const signUp = useAuth(s => s.signUp);
	const {setPlayer} = useUser();

	const validatePhone = (phone: string) => {
		const kyrgyzPattern = /^\+996\d{9}$/;
		return kyrgyzPattern.test(phone);
	};

	const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let isValidate = false;
		const newErrors = { name: '', phone: '' };
		if (!name.trim()) {
			newErrors.name = 'Имя обязательно';
			isValidate = true;
		}
		if (!validatePhone(phone)) {
			newErrors.phone = 'Введите номер в формате +996XXXXXXXXX';
			isValidate = true;
		}
		setErrors(newErrors);

		if(!isValidate){
			signUp( name, phone, () =>
			navigate(AppRoutes.INTRO, { replace: true }), (data) => setPlayer(data ?? {} as PlayerDto))
		}
	}
	if (!hasRun.current) {
  hasRun.current = true;
  setTimeout(() => {
    ref.current += 1;
    forceUpdate(); 
  }, 1500);
}
	return (
		<div
			className={`${styles.main} ${
				ref.current < 1 ? styles.blackBackground : styles.imageBackground
			}`}
		>
			<AnimatePresence mode='wait'>
				{ref.current < 1 && (
					<motion.div
						key='text'
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 2 }}
						className={isMobile ? styles.mobileIntro : ''}
					>
						<img src={Logo2} alt='logo' />
					</motion.div>
				)}
			</AnimatePresence>
			{ref.current >= 1 && (
				<MultiContainer className={styles.auth}>
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
					<div className={(styles.registration)}>
						<h3>Registration</h3>
						<form onSubmit={e => handleClick(e)} noValidate>
							<label htmlFor='name'>Name:</label>
							<input
								id='name'
								type='text'
								required
								placeholder='Name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							{errors.name && <div className={styles.inputError}>{errors.name}</div>}
							<label htmlFor='phoneNumber'>Phone number:</label>
							<input
								id='phoneNumber'
								type='tel'
								required
								placeholder='+996XXXXXXXXX'
								maxLength={13}
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
							{errors.phone && <div className={styles.inputError}>{errors.phone}</div>}
							<button type='submit'>Sign Up</button>
						</form>
					</div>
				</MultiContainer>
			)}
		</div>
	)
}
