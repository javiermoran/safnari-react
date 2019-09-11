import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as history from 'history';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Login from './components/Login';
import Register from './components/Register';
import Collections from './components/collections/Collections';
import CollectionDetails from './components/collections/details/CollectionDetails';
import Footer from './components/footer/Footer';
import SafnariDrawer from './components/drawer/SafnariDrawer';
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
          <SafnariDrawer />
          <main>
            <Switch>
              <Route path="/" component={Dashboard} exact={true} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/collections" component={Collections} exact={true} />
              <Route path="/collections/:collectionId" component={CollectionDetails} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
