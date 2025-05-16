import { AnimatePresence, motion } from 'framer-motion';
import { useReducer, useRef, useState, type FC } from 'react';
import Logo2 from '../../shared/assets/images/geeks 2.png';
import { useMediaQuery } from '../../shared/hooks/use-media-query';
import styles from './auth-page.module.scss';
import { AuthBlock } from '../../widgets/auth-block';
import { AppRoutes } from '../../shared/utils/consts/consts';

export const AuthPage: FC = () => {
  const isMobile = useMediaQuery('(max-width: 510px)');
  const ref = useRef(0);
  const hasRun = useRef(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isRegister, setIsRegister] = useState(true);

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
        <>
          <AuthBlock
            title={isRegister ? 'Registration' : 'Sign In'}
            buttonText={isRegister ? 'Sign Up' : 'Sign In'}
            setIsRegister={setIsRegister}
            redirectPath={AppRoutes.INTRO}
            isRegister={isRegister}
          />
        </>
      )}
    </div>
  );
};
