import { useEffect } from 'react';
import { useRounds } from '../context/RoundsContext';
import { useStatus } from '../context/StatusContext'; 
import '../styles/BetaAbout.scss';

const Rounds = () => {
  const { rounds } = useRounds();
  const {setStatus} = useStatus();

  useEffect(() => {
    // Check if remaining rounds are zero or less
    const remainingRounds = rounds[1] - rounds[0];
    if (remainingRounds <= 0) {
      setStatus('SUCCESS');
    }
  }, [rounds, setStatus]);

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