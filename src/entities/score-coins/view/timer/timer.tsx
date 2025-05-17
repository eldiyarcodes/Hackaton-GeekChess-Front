import type { FC } from 'react';
import { useUser } from '../../../../features/auth/model/use-user';
import { useGame } from '../../../../shared/hooks/use-game';
import { useGameTimer } from '../../../../shared/hooks/use-game-timer';
import { GAME_TIMER } from '../../../../shared/utils/consts/consts';
import { formatTime } from '../../../../shared/utils/helpers';
import { useSendScore } from '../../../../widgets/result/model/useSendScore';
import classes from './timer.module.scss';

export const Timer: FC<{ timerKey: number; totalScore: number }> = ({
  timerKey,
  totalScore,
}) => {
  const setIsGameOver = useGame((state) => state.setIsGameOver);
  const { fetchScore } = useSendScore();
  const { player } = useUser();

  const timeLeft = useGameTimer(
    GAME_TIMER,
    () => {
			console.log('⏰ Таймер закончился');
      setIsGameOver(true);

      if (player?._id) {
				console.log('📤 Отправляем результат', player._id, totalScore);
        fetchScore(player._id, totalScore);
      }
    },
    timerKey
  );

  return <div className={classes.timer}>{formatTime(timeLeft)}</div>;
};
