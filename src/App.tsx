import React, { useState } from "react";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/Register";
import Collections from "./components/collections/Collections";
import CollectionDetails from "./components/collections/details/CollectionDetails";
import Footer from "./components/footer/Footer";
import SafnariDrawer from "./components/drawer/SafnariDrawer";
import Settings from "./components/config/Settings";
import ItemDetails from "./components/items/details/ItemDetails";
import { AppContext } from "./context";
import "./App.scss";

interface IAppProps {
  user: any;
}

const App = (props: IAppProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const darkMode = props.user.darkMode ? 'App--dark-mode' : ''
  const hideDrawer = !props.user.loggedIn ? 'App--no-drawer' : '';
  const toggleDrawer = (val: boolean) => {
    setDrawerIsOpen(val);
  }
  return (
    <AppContext.Provider value={{ drawerOpen: drawerIsOpen, setDrawerOpen: toggleDrawer }}>
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
              <Route path="/items/:itemId" component={ItemDetails}></Route>
              <Route path="/settings" component={Settings} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
