import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/model/use-auth';
import { useUser } from '../../features/auth/model/use-user';
import { BoardComponent } from '../../features/board';
import { Board } from '../../features/board/model/board';
import Logo2 from '../../shared/assets/images/geeks 2.png';
import Logo from '../../shared/assets/images/Logo.svg';
import { useGame } from '../../shared/hooks/use-game';
import { Modal } from '../../shared/ui/modal/modal';
import { MultiContainer } from '../../shared/ui/multi-container/MultiContainer';
import { AppRoutes, rules } from '../../shared/utils/consts/consts';
import styles from './intro-page.module.scss';

export const IntroPage: FC = () => {
  const [board, setBoard] = useState(new Board());
  const setIsGameOver = useGame((s) => s.setIsGameOver);
  const navigate = useNavigate();
  const { clearPlayer } = useUser();
  const logout = useAuth((s) => s.logout);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <>
      <MultiContainer className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={Logo2} alt='geeks logo' />
        </div>
        <div className={styles.room}>
          <BoardComponent board={board} setBoard={setBoard} />
        </div>
        <Modal
          isOpen={true}
          title='Rules of the game'
          className={styles.customModal}
        >
          <div className={styles.content}>
            <div className={styles.geeks}>
              <span className={styles.name}>GEEKS</span>
              <div className={styles.logoContainer}>
                <img src={Logo} alt='Logo' />
              </div>
            </div>
            <ul className={styles.rules}>
              {rules.map((rule) => (
                <li key={rule.id}>{rule.text}</li>
              ))}
            </ul>
          </div>
          <div className={styles.btns}>
            <button
              type='button'
              onClick={() => {
                setIsGameOver(false);
                navigate(AppRoutes.GAME_ROOM);
              }}
              className={styles.startButton}
            >
              Start the game
            </button>
            <button
              onClick={() =>
                logout(
                  () => navigate(AppRoutes.HOME),
                  () => clearPlayer()
                )
              }
              type='button'
              className={styles.quit}
            >
              Exit
            </button>
          </div>
        </Modal>
      </MultiContainer>
    </>
  );
};
