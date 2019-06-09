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
      this.props.history.push('/home');
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
        this.setState({ loading: false });
        this.props.dispatch({ type: 'LOGGED_IN' })
        this.props.history.push('/home');
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
          <h1>Log in</h1>
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
