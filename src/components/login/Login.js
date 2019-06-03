import React from 'react';
import './Login.scss';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };
  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState({ username });
  };
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };
  isBtnDisabled = () => {
    return !this.state.password || !this.state.username;
  };
  render() {
    return (
      <div className="Login">
        <div class="container">
          <h1>Log in</h1>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email or Username</label>
              <input 
                type="email"
                class="form-control"
                placeholder="Email or username"
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Password</label>
              <input 
                type="password" 
                class="form-control"
                placeholder="Password" 
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </div>
          </form>
          <button 
            type="submit"
            class="btn btn-primary"
            disabled={this.isBtnDisabled()}
          >
          Log in
          </button>
        </div>
      </div>
    )
  }
}

export default Login;
