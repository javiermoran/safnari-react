import React from 'react';
import api from '../../../safnari.api';
import './CollectionDetails.scss';

class CollectionDetails extends React.Component {
  state = {
    name: '',
    breadcrumbs: [],
    icon: ''
  };
  componentDidMount() {
    const { collectionId } = this.props.match.params;
    this.getCollectionDetails(collectionId);
  }
  getCollectionDetails(id) {
    api.collections.get(id).then((response) => {
      const { name, breadcrumbs } = response.data;
      const { icon } = response.data.type;
      this.setState({ name, breadcrumbs, icon });
    });
  }
  render() {
    return (
      <div className="CollectionDetails">
        <div className="container">
          <h2 className="CollectionDetails__title">
            <i className={`fas ${this.state.icon}`}></i>
            {this.state.name}
          </h2>
        </div>
      </div>
    );
  }
}

export default CollectionDetails;
