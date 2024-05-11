import PropTypes from 'prop-types';
import React, { useState } from 'react';

const RoundsContext = React.createContext();

const RoundsProvider = ({ children }) => {
  const [rounds, setRounds] = useState([0, 4]);
  const [roundsActive,setRoundsActive]=useState(false);

  const new_rounds = () => {
    const count_round = () => {
      setRounds((prevRounds) => [prevRounds[0] + 1, prevRounds[1]]);
    };

    const reset_round = () => {
      setRounds((prevRounds) => [0, prevRounds[1]]);
    };

    const set_limit = (limit) => {
      setRounds((prevRounds) => [limit, prevRounds[1]]);
    };

    return {
      count_round,
      reset_round,
      set_limit,
    };
  };

  const { count_round, reset_round, set_limit } = new_rounds();

  return (
    <RoundsContext.Provider value={{ rounds, count_round, reset_round, set_limit,roundsActive,setRoundsActive }}>
      {children}
    </RoundsContext.Provider>
  );
};

const useRounds = () => {
  const context = React.useContext(RoundsContext);
  if (context === undefined) {
    throw new Error('useRounds must be used within a RoundsProvider');
  }
  return context;
};

RoundsProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
export { RoundsProvider, useRounds };