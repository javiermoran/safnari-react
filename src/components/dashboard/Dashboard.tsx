import React from "react";
import { connect } from "react-redux";
import { IUser } from "../../models/IUser";
import { Typography } from "@material-ui/core";
import api from '../../safnari.api';
import DashboardItem from "./DashboardItem";
import withAuth from '../common/authorized/withAuth';

interface IDashboardProps {
  user: IUser
}

class Dashboard extends React.Component<IDashboardProps> {
  state = {
    counts: {
      collections: 0,
      items: 0
    }
  }
  componentDidMount() {
    api.statistics.getCounts().then((response) => {
      this.setState({ counts: response.data });
    });
  }
  renderCounts(): JSX.Element {
    const { collections, items } = this.state.counts;
    return (
      <div className="Dashboard__counts">
        <div className="row">
          <div className="col col-12 col-sm-6 col-lg-3">
            <DashboardItem title="Collections" number={collections} />
          </div>
          <div className="col col-12 col-sm-6 col-lg-3">
            <DashboardItem title="Total Items" number={items} />
          </div>
        </div>
      </div>
    );
  }
  render(): JSX.Element {
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="Dashboard__header">
            <Typography variant="h2">{this.props.user.username}</Typography>
          </div>
          {this.renderCounts()}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  loading: state.loading
});

export default connect(mapStateToProps)(withAuth(Dashboard));
