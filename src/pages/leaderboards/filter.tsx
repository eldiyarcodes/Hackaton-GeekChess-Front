import { GAME_MODE } from '../../shared/utils/consts/consts';
import { useLeaderBoard } from '../../widgets/leader-board';
import classes from './leaderboards.module.scss';

export function LeaderboardFilter() {
  const { filterMode, setFilterMode } = useLeaderBoard();

  return (
    <div className={classes.filter}>
      <select
        title='filter'
        style={{ outline: '1px solid #f5d91f' }}
        value={filterMode}
        onChange={(e) => setFilterMode(Number(e.target.value) as GAME_MODE)}
      >
        <option value={GAME_MODE.RAPID}>Rapid (60 сек)</option>
        <option value={GAME_MODE.BLITZ}>Blitz (30 сек)</option>
        <option value={GAME_MODE.BULLET}>Bullet (15 сек)</option>
      </select>
    </div>
  );
}
