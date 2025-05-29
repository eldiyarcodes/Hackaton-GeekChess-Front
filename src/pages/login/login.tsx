import { LoginForm } from '@/features/auth/view/login-form';
import { ROUTES } from '@/shared/utils/consts/consts';
import { AuthLayout } from '@/widgets/auth-layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducer, useRef, type FC } from 'react';
import { Link } from 'react-router-dom';
import Logo2 from '../../shared/assets/images/geeks 2.png';
import { useMediaQuery } from '../../shared/utils/hooks/use-media-query';
import styles from './login.module.scss';

const Login: FC = () => {
  const isMobile = useMediaQuery('(max-width: 510px)');
  const ref = useRef(0);
  const hasRun = useRef(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

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
        <AuthLayout
          title='Log in'
          form={<LoginForm />}
          footerText={
            <>
              First time here?{' '}
              <Link to={ROUTES.REGISTER}>Sign up for free</Link>
            </>
          }
        />
      )}
    </div>
  );
};

export const Component = Login;
