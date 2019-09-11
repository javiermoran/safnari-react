import React from 'react';
import { History } from 'history';

interface IwithAuthProps {
  history: History;
}

const withAuth = (Component: React.ComponentClass<any>) => {
  return class extends React.Component<IwithAuthProps> {
    state = {
      loggedIn: true
    }
    componentWillMount() {
      if (!localStorage.getItem('authToken')) {
        localStorage.removeItem('user');
        this.props.history.push('/login');
        this.setState({ loggedIn: false });
      }
    }
    render() {
      return this.state.loggedIn ? <Component {...this.props} /> : null;
    }
  }
}

export default withAuth;
