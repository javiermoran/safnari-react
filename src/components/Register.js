import React from "react";
import { connect } from 'react-redux';
import onInputChange from '../utils/onInputChange';
import api from '../safnari.api';
import alertsActions from '../actions/alerts';

class Register extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    password2: '',
    loading: false
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email, username, password } = this.state;
    const user = { email, username, password };
    this.setState({ loading: true });
    api.users.create(user)
      .then(() => {
        this.setState({ loading: false });
        const message = 'You have registered succesfully';
        this.props.dispatch(alertsActions.addAlert(message, 'success'));
        this.props.history.push('/login');
      }).catch((error) => {
        const message = 'Error when trying to register the user';
        this.props.dispatch(alertsActions.addAlert(message, 'error'));
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <div className="Register">
        <div className="container">
          <h1>Create account</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => { onInputChange(e, this) } }
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={(e) => { onInputChange(e, this) } }
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => { onInputChange(e, this) } }
              />
            </div>
            <div className="form-group">
              <input
                name="password2"
                type="password"
                className="form-control"
                placeholder="Repeat password"
                onChange={(e) => { onInputChange(e, this) } }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ alerts }) => ({ alerts });

export default connect(mapStateToProps)(Register);
