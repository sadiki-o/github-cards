import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store'
import { Provider } from 'react-redux'

window.store = store

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
