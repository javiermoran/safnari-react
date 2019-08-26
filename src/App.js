import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as history from 'history';
import Dashboard from './components/Dashboard';
import Header from './components/header/Header';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/footer/Footer';
import configureStore from './store/configureStore';
import './scss/main.scss';
import './App.scss';

const browserHistory = history.createBrowserHistory();
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <div className="App">
        <div className="App__content">
          <Header />
          <Switch>
            <Route path="/" component={Dashboard} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
