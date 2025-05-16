import { useState, type FC } from 'react';
import { MultiContainer } from '../../../shared/ui/multi-container/MultiContainer';
import styles from './AuthBlock.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/model/use-auth';
import { useUser, type PlayerDto } from '../../../features/auth/model/use-user';
import Logo2 from '../../../shared/assets/images/geeks 2.png';
import WhiteKnight from '../../../shared/assets/images/white-knight.svg';

type AuthBlockProps = {
  title: string;
  buttonText: string;
  redirectPath: string;
  isRegister?: boolean;
  setIsRegister: (bol: boolean) => void;
};

export const AuthBlock: FC<AuthBlockProps> = ({
  title,
  buttonText,
  redirectPath,
  isRegister = true,
  setIsRegister,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const navigate = useNavigate();
  const { signUp, signIn, isLoading } = useAuth();
  const { setPlayer } = useUser();

  const validatePhone = (phone: string) => {
    const kyrgyzPattern = /^\+996\d{9}$/;
    return kyrgyzPattern.test(phone);
  };
  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: '', phone: '' };
    if (!name.trim()) {
      newErrors.name = 'Имя обязательно';
      hasError = true;
    }
    if (!validatePhone(phone)) {
      newErrors.phone = 'Введите номер в формате +996XXXXXXXXX';
      hasError = true;
    }
    setErrors(newErrors);

    if (!hasError) {
      const authFn = isRegister ? signUp : signIn;
      authFn(
        name,
        phone,
        () => navigate(redirectPath, { replace: true }),
        (data) => setPlayer(data ?? ({} as PlayerDto))
      );
    }
  };
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
        <h3>{title}</h3>
        <form onSubmit={(e) => handleClick(e)} noValidate>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            required
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <div className={styles.inputError}>{errors.name}</div>
          )}
          <label htmlFor='phoneNumber'>Phone number:</label>
          <input
            id='phoneNumber'
            type='tel'
            required
            placeholder='+996XXXXXXXXX'
            maxLength={13}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <div className={styles.inputError}>{errors.phone}</div>
          )}
          <button type='submit' disabled={isLoading} className={styles.mainBtn}>
            {isLoading ? 'Loading...' : buttonText}
          </button>
          <div className={styles.toggle}>
            <p>
              {isRegister
                ? 'Already have an account?'
                : 'First time here?'}
            </p>
            <button type="button" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Log in' : 'Sign up for free'}
              </button>
          </div>
        </form>
      </div>
    </MultiContainer>
  );
};
