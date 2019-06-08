import React from 'react';

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
        <div className="container">
          <h1>Log in</h1>
          <form>
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
          </form>
          <button 
            type="submit"
            className="btn btn-primary"
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
