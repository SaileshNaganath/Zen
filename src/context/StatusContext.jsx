import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRounds } from './RoundsContext';

const StatusContext = React.createContext();

const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState('INITIAL');
  const [currentAction, setCurrentAction] = useState(null);
  const { rounds,count_round } = useRounds();

  const get_next_state = (currentAction) => {
    switch (currentAction) {
      case null:
        return 'INHALE';
      case 'INHALE':
        return 'HOLD';
      case 'HOLD':
        return 'EXHALE';
      case 'EXHALE':
        return 'WAIT';
      case 'WAIT': {
        count_round();
        const completed_rounds = rounds[0];
        const total_rounds = rounds[1];
        if (completed_rounds === total_rounds) {
          setStatus('SUCCESS');
          return null;
        }
        return 'INHALE';
      }
      default:
        throw new Error('Invalid status');
    }
  };


   
    const next_step = () => {
      setCurrentAction((state) => get_next_state(state));
    };


  const is_active_action = () => {
    return ['INHALE', 'EXHALE'].includes(currentAction || '');
  };

  useEffect(() => {
    // Subscribe to any necessary events or state changes
    console.log('Status changed:', status);
  }, [status]);

  return (
    <StatusContext.Provider value={{ status,setStatus, is_active_action ,currentAction,next_step}}>
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
