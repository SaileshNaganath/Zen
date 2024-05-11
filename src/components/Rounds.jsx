import { useState, useEffect } from 'react';
import { useRounds } from '../context/RoundsContext';
import '../styles/BetaAbout.scss';

const Rounds = () => {
  const { rounds } = useRounds();
  const [completedRounds, setCompletedRounds] = useState(rounds[0]);
  const [totalRounds, setTotalRounds] = useState(rounds[1]);

  useEffect(() => {
    setCompletedRounds(rounds[0]);
    setTotalRounds(rounds[1]);
  }, [rounds]);



  return (
    <div>
      <h1 className='feeling_heading'>Rounds</h1>
      <br/>
        <p className='status-heading'>Remaining Rounds: {totalRounds - completedRounds}</p>
    </div>
  );
};

export default Rounds;