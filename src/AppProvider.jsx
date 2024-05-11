import PropTypes from 'prop-types';
import { StatusProvider } from './context/StatusContext';
import { RoundsProvider } from './context/RoundsContext';

const AppProvider = ({ children }) => {
  return (
    <RoundsProvider>
    <StatusProvider>
      
        {children}
     
    </StatusProvider>
    </RoundsProvider>
  );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default AppProvider;