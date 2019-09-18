import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { IUser } from "../../models/IUser";
import { Typography } from "@material-ui/core";
import api from '../../safnari.api';
import DashboardItem from "./DashboardItem";
import withAuth from '../common/authorized/withAuth';
import BarChart from "../common/charts/BarChart";
import { ICollection } from "../../models/ICollection";
import collectionsActions from "../../actions/collections.actions";
import { IType } from "../../models/IType";

interface IDashboardProps {
  user: IUser;
  collections: ICollection[];
  dispatch: Dispatch<any>;
}

class Dashboard extends React.Component<IDashboardProps> {
  state = {
    counts: {
      collections: 0,
      items: 0
    }
  }
  componentDidMount() {
    this.getCollections();
    api.statistics.getCounts().then((response) => {
      this.setState({ counts: response.data });
    });
  }
  getCollections() {
    this.props.dispatch(collectionsActions.getCollections());
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
  getCollectionsData(): any {
    let data: any = {};
    if (this.props.collections.length) {
      this.props.collections.forEach((collection: ICollection) => {
        const key = (collection.type as IType).name as string;
        const label = (collection.type as IType).description;
        !!data[key] ? data[key].value++ : data[key] = { value: 1, label };
      });
      const dataArr = Object.keys(data).map(key => data[key]);
      data = dataArr;
    }
    return data;
  }
  renderCharts() {
    const barData = this.getCollectionsData();
    return (
      <div className="Dashboard__charts">
        <BarChart data={barData} />
      </div>
    )
  }
  render(): JSX.Element {
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="Dashboard__header">
            <Typography variant="h2">{this.props.user.username}</Typography>
          </div>
          {this.renderCounts()}
          {this.renderCharts.bind(this)()}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any) => ({
  collections: state.collections,
  user: state.user,
  loading: state.loading
});

export default connect(mapStateToProps)(withAuth(Dashboard));
