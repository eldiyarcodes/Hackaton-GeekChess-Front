import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../shared/utils/consts/consts';
import { useAuth } from '../model/use-auth';
import { useUser, type PlayerDto } from '../model/use-user';
import styles from './auth.module.scss';

export function AuthForm({
  isRegister,
  buttonText,
  setIsRegister,
}: {
  isRegister: boolean;
  buttonText: string;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        () => navigate(AppRoutes.INTRO, { replace: true }),
        (data) => setPlayer(data ?? ({} as PlayerDto))
      );
    }
  };

  return (
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
      {errors.name && <div className={styles.inputError}>{errors.name}</div>}
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
      {errors.phone && <div className={styles.inputError}>{errors.phone}</div>}
      <button type='submit' disabled={isLoading} className={styles.mainBtn}>
        {isLoading ? 'Loading...' : buttonText}
      </button>
      <div className={styles.toggle}>
        <p>{isRegister ? 'Already have an account?' : 'First time here?'}</p>
        <button type='button' onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Log in' : 'Sign up for free'}
        </button>
      </div>
    </form>
  );
}
