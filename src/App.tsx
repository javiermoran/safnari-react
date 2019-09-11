import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Login from './components/Login';
import Register from './components/Register';
import Collections from './components/collections/Collections';
import CollectionDetails from './components/collections/details/CollectionDetails';
import Footer from './components/footer/Footer';
import SafnariDrawer from './components/drawer/SafnariDrawer';
import Settings from './components/config/Settings';
import './App.scss';

interface IAppProps {
  user: any
}

class App extends React.Component<IAppProps> {
  render() {
    const darkMode = this.props.user.darkMode ? 'App--dark-mode': '';
    const hideDrawer = !this.props.user.loggedIn ? 'App--no-drawer': '';
    return (
      <div className={`App ${darkMode} ${hideDrawer}`}>
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
              <Route path="/settings" component={Settings} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
