
import { useRounds } from '../context/RoundsContext';
import '../styles/BetaAbout.scss';

const Rounds = () => {
  const { rounds } = useRounds();

  // Calculate remaining rounds dynamically
  const remainingRounds = rounds[1] - rounds[0];

  return (
    <div>
      <h1 className='feeling_heading'>Rounds</h1>
      <br/>
        <p className='status-heading'>Remaining Rounds: {remainingRounds}</p>
    </div>
  );
};

export default Rounds;