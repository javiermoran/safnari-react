import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { IUser } from "../models/IUser";

interface IDashboardState {
  user: IUser
}

interface IDashboardProps {
  user: IUser
}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  render(): JSX.Element {
    return (
      <div className="Dashboard">
        <div className="container">
          <h2>Wellcome, {this.props.user.username}</h2>
          <NavLink to="/collections">Collections</NavLink>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: IDashboardState) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
