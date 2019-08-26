import React from 'react';
import { connect } from 'react-redux';
import api from '../safnari.api';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
    loading: false
  };
  constructor(props) {
    super(props);

    if(api.users.isLoggedIn()) {
      this.props.dispatch({ type: 'LOGGED_IN' })
      this.props.history.push('/');
    }
  }
  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState({ username });
  };
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };
  isBtnDisabled = () => {
    return !this.state.password || !this.state.username || this.state.loading;
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { username, password } = this.state;
    api.users.login(username, password)
      .then(() => {
        this.props.dispatch({ type: 'LOGGED_IN' });
        api.users.me().then((userResponse) => {
          const user = userResponse.data;
          this.props.dispatch({ type: 'SET_USER', user });
          this.setState({ loading: false });
          this.props.history.push('/');
        }); 
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: 'Incorrect username or password', loading: false });
      })
  };
  render() {
    return (
      <div className="Login">
        <div className="container">
          <h2>Sign in</h2>
          { this.state.error }
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email or Username</label>
              <input 
                type="email"
                className="form-control"
                placeholder="Email or username"
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control"
                placeholder="Password" 
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </div>
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={this.isBtnDisabled()}
            >
            Log in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Login);
