import React, { Dispatch } from 'react';
import { Typography, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import withAuth from '../common/authorized/withAuth';
import userActions from '../../actions/user.actions';
import './Settings.scss';

interface ISettingsProps {
  dispatch: Dispatch<any>;
  user: any;
}

class Settings extends React.Component<ISettingsProps> {
  state = {
    darkMode: false
  }
  componentDidMount() {
    const darkMode = this.props.user.darkMode;
    this.setState({ darkMode });
  }
  handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const darkMode = event.target.checked;
    this.setState({ darkMode });
    this.props.dispatch(userActions.setUser({ darkMode }));
  }
  render() {
    return (
      <div className="Settings">
        <div className="container">
          <Typography variant="h2">Settings</Typography>
          <FormGroup>
          <FormControlLabel
            className="Setting__label"
            control={
              <Switch
                checked={this.state.darkMode}
                onChange={this.handleDarkModeChange}
                value="checkedB"
                color="primary"
              />
            }
            label="Dark Mode"
          />
          </FormGroup>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state: any) => ({
  user: state.user
});

export default connect(mapStatetoProps)(withAuth(Settings));
