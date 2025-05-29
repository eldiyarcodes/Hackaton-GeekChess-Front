import { useState } from 'react';
import Logo2 from '../../../shared/assets/images/geeks 2.png';
import WhiteKnight from '../../../shared/assets/images/white-knight.svg';
import { MultiContainer } from '../../../shared/ui/multi-container/MultiContainer';
import styles from './auth.module.scss';
import { AuthForm } from './login-form';

export function AuthLayout() {
  const [isRegister, setIsRegister] = useState(true);

  return (
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
      <div className={styles.registration}>
        <h3>{isRegister ? 'Registration' : 'Sign In'}</h3>
        <AuthForm
          buttonText={isRegister ? 'Sign Up' : 'Sign In'}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
        />
      </div>
    </MultiContainer>
  );
}
