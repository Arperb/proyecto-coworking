import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';



ReactDOM.render(
  <React.StrictMode>
        <Router>
          <App />
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();