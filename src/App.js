import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as history from 'history';
import './App.scss';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import configureStore from './store/configureStore';

const browserHistory = history.createBrowserHistory();
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;