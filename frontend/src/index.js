import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* Bootsratp Configuration */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </AuthProvider>
);
