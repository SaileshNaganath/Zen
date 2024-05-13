import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRounds } from './RoundsContext';

const StatusContext = React.createContext();

const StatusProvider = ({ children }) => {


  const [status, setStatus] = useState('READY');
  const [currentAction, setCurrentAction] = useState(null);
  const { rounds,count_round ,reset_round } = useRounds();

const nextStep = (currentAction) => {
  switch (currentAction) {
    case null:
      setCurrentAction('INHALE');
      break;
    case 'INHALE':
      setCurrentAction('HOLD');
      break;
    case 'HOLD':
      setCurrentAction('EXHALE');
      break;
    case 'EXHALE':
      setCurrentAction('WAIT');
      break;
    case 'WAIT':
      {
        count_round();
        const completed_rounds = rounds[0];
        const total_rounds = rounds[1];
        if (completed_rounds === total_rounds) {
          setStatus('SUCCESS');
          setCurrentAction(null);
          reset_round();
        } else {
          setCurrentAction('INHALE');
        }
        break;
      }
     
    default:
      console.error('Invalid status:', currentAction);
      break;
  }
};


  return (
    <StatusContext.Provider value={{ status,setStatus,currentAction,setCurrentAction,nextStep}}>
      {children}
    </StatusContext.Provider>
  );
};

const useStatus = () => {
  const context = React.useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};

StatusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StatusProvider, useStatus };
