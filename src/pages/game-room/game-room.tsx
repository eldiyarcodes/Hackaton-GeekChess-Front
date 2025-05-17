import { useEffect, useState, type FC } from 'react';
import { ScoreCoins } from '../../entities/score-coins';
import { Timer } from '../../entities/score-coins/view/timer/timer';
import { BoardComponent } from '../../features/board';
import { Board } from '../../features/board/model/board';
import logo from '../../shared/assets/images/geeks 2.png';
import { useGame } from '../../shared/hooks/use-game';
import { useMediaQuery } from '../../shared/hooks/use-media-query';
import { Modal } from '../../shared/ui';
import { MultiContainer } from '../../shared/ui/multi-container/MultiContainer';
import { TabBar } from '../../shared/ui/tab-bar/TabBar';
import { LeaderBoard } from '../../widgets/leader-board';
import { ResultInfo } from '../../widgets/result';
import classes from './game-room.module.scss';

export const GameRoom: FC = () => {
  const [board, setBoard] = useState(new Board());
  const [timerKey, setTimerKey] = useState(0);
  const isMobile = useMediaQuery('(max-width: 510px)');
  const isGameOver = useGame((state) => state.isGameOver);

  useEffect(() => {
    restart();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard((prev) => {
        const newLevel = prev.getCoinLevel() + 1;
        prev.setCoinLevel(newLevel);

        return Object.assign(new Board(), prev);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    newBoard.addCoins(5);
    setBoard(newBoard);
    setTimerKey((k) => k + 1);
  }

  const scoreBoardCoins = {
    lotCoin150: board.lostCoint150,
    lotCoin200: board.lostCoint200,
    lotCoin250: board.lostCoint250,
    lotCoin300: board.lostCoint300,
    lotCoin350: board.lostCoint350,
    totalScore: board.totalScore,
  };

  const tabs = [
    { label: 'LEADERBOARD:', content: <LeaderBoard /> },
    {
      label: 'SCOREBOARD:',
      content: <ScoreCoins coins={scoreBoardCoins} timerKey={timerKey} />,
    },
  ];

  return (
    <div className={classes.room}>
      <MultiContainer className={classes.container}>
        {isMobile ? (
          <>
            <div className={classes.imgContainer}>
              <img src={logo} alt='geeks logo' className={classes.logo} />
            </div>
            <Timer
              timerKey={timerKey}
              totalScore={scoreBoardCoins.totalScore}
            />
            <BoardComponent board={board} setBoard={setBoard} />
            <TabBar className={classes.tabBar} defaultActive={0} tabs={tabs} />
          </>
        ) : (
          <>
            <div className={classes.imgContainer}>
              <img src={logo} alt='geeks logo' className={classes.logo} />
            </div>
            <div className={classes.evenBoard}>
              <LeaderBoard />
              <div className={classes.board}>
                <BoardComponent board={board} setBoard={setBoard} />
              </div>
              <ScoreCoins timerKey={timerKey} coins={scoreBoardCoins} />
            </div>
          </>
        )}
      </MultiContainer>
      <Modal isOpen={isGameOver}>
        <ResultInfo coins={scoreBoardCoins} onRestart={restart} />
      </Modal>
    </div>
  );
};
