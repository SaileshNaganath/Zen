import { useState, useEffect } from 'react';
import { useRounds } from '../context/RoundsContext';

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
      <h2>Rounds</h2>
      <div className="rounds">
        <p>Remaining Rounds: {totalRounds - completedRounds}</p>

      </div>
    </div>
  );
};

export default Rounds;