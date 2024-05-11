import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRounds } from './RoundsContext';

const StatusContext = React.createContext();

const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState('INITIAL');
  const [currentAction, setCurrentAction] = useState(null);
  const { rounds,count_round } = useRounds();

  const get_next_state = (currentStatus) => {
    switch (currentStatus) {
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
      case null:
        return 'INHALE';
      default:
        throw new Error('Invalid status');
    }
  };


   
    const next_step = () => {
      setCurrentAction((state) => {
        const nextState = get_next_state(state);
        return nextState;
      });
    };


  const is_active_action = () => {

    return ['INHALE', 'EXHALE'].includes(currentAction || '');
  };

  useEffect(() => {
    // Subscribe to any necessary events or state changes
    // For example, you can log the status whenever it changes
    console.log('Status changed:', status);
  }, [status]);

  return (
    <StatusContext.Provider value={{ status, is_active_action ,currentAction,next_step,setStatus}}>
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
