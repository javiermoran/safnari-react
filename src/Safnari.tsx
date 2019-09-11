import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as history from 'history';
import configureStore from './store/configureStore';
import App from './App';
import './scss/main.scss';

const browserHistory = history.createBrowserHistory();
const store = configureStore();

export default () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>
);
