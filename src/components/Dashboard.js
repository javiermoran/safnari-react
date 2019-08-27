import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
