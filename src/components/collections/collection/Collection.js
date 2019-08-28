import React from 'react';
import { withRouter } from 'react-router-dom';
import './Collection.scss';

class Collection extends React.Component {
  goToDetails = () => {
    console.info(this.props);
    const { history } = this.props;
    const id = this.props.data._id;
    history.push(`/collections/${id}`);
  }
  render() {
    const { icon } = this.props.data.type;
    return (
      <div className="Collection" onClick={this.goToDetails}>
        <i className={`fas ${icon} Collection__icon`}></i>
        <span>{this.props.data.name}</span>
      </div>
    )
  }
}

export default withRouter(Collection);
