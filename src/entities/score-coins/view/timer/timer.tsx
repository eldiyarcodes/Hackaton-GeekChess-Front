import type { FC } from 'react';
import { useGame } from '../../../../shared/hooks/use-game';
import { useGameTimer } from '../../../../shared/hooks/use-game-timer';
import { GAME_TIMER } from '../../../../shared/utils/consts/consts';
import { formatTime } from '../../../../shared/utils/helpers';
import classes from './timer.module.scss';

export const Timer: FC<{ timerKey: number }> = ({ timerKey }) => {
  const setIsGameOver = useGame((state) => state.setIsGameOver);

  const timeLeft = useGameTimer(
    GAME_TIMER,
    () => setIsGameOver(true),
    timerKey
  );

  return <div className={classes.timer}>{formatTime(timeLeft)}</div>;
};
