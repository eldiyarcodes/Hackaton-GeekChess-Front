import { GAME_MODE } from '../../shared/utils/consts/consts';
import { useGame } from '../../shared/utils/hooks/use-game';

export function GameModeSelect() {
  const gameMode = useGame((state) => state.gameMode);
  const setGameMode = useGame((state) => state.setGameMode);

  return (
    <select
      title='game-mode'
      value={gameMode}
      onChange={(e) => setGameMode(Number(e.target.value) as GAME_MODE)}
      style={{
        padding: 10,
        flex: 1,
        borderRadius: 4,
        outline: '1px solid #f5d91f',
      }}
    >
      <option value={GAME_MODE.RAPID}>Rapid (60 сек)</option>
      <option value={GAME_MODE.BLITZ}>Blitz (30 сек)</option>
      <option value={GAME_MODE.BULLET}>Bullet (15 сек)</option>
    </select>
  );
}
