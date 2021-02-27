import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import loginReducer from './componentes/store/loginReducer';
import registroReducer from './componentes/store/registroReducer';
import ErrorBoundary from './ErrorBoundary';



const rootReducer = combineReducers({
  login: loginReducer,
  registro: registroReducer
})

const localStorageMiddleware = store => next => action => {
  let result = next(action)
  localStorage.setItem('session', JSON.stringify(store.getState()))
  return result
}
const saved = localStorage.getItem('session')
const initialStore = saved ? JSON.parse(saved) : undefined
const store = createStore(rootReducer, initialStore, applyMiddleware(localStorageMiddleware))

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();