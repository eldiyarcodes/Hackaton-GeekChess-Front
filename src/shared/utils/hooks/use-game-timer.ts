import { useEffect, useState } from 'react';
import { useGame } from './use-game';

export function useGameTimer(
  duration: number,
  onEnd: () => void,
  timerKey = 0
) {
  const [timeLeft, setTimeLeft] = useState(duration * 1000);
  const { startedAt, setStartedAt } = useGame();

  useEffect(() => {
    const now = Date.now();
    const actualStartedAt = startedAt || now;

    if (!startedAt) {
      setStartedAt(now);
    }

    const endAt = actualStartedAt + duration * 1000;

    const interval = setInterval(() => {
      const newTimeLeft = Math.max(0, endAt - Date.now());
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(interval);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerKey]);

  return Math.ceil(timeLeft / 1000);
}
