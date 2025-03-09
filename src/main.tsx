
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Import our Win95 styles if they're not already imported
import './styles/win95.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
