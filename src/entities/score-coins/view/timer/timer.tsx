import type { FC } from 'react';
import { useGame } from '../../../../shared/hooks/use-game';
import { useGameTimer } from '../../../../shared/hooks/use-game-timer';
import { formatTime } from '../../../../shared/utils/helpers';
import classes from './timer.module.scss';

export const Timer: FC<{ timerKey: number }> = ({ timerKey }) => {
  const setIsGameOver = useGame((state) => state.setIsGameOver);
  const setStartedAt = useGame((state) => state.setStartedAt);
  const timer = useGame((state) => state.gameMode);

  const timeLeft = useGameTimer(
    timer,
    () => {
      setIsGameOver(true);
      setStartedAt(null);
    },
    timerKey
  );

  return <div className={classes.timer}>{formatTime(timeLeft)}</div>;
};
