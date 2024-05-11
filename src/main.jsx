import React from 'react'
import ReactDOM from 'react-dom/client'
import AppProvider from './AppProvider.jsx'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProvider> 
      <App />
    </AppProvider>
  </React.StrictMode>
);
