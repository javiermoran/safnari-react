import React from 'react';
import { connect } from 'react-redux';
import Collection from './collection/Collection';
import collectionsActions from '../../actions/collections';

class Collections extends React.Component {
  componentDidMount() {
    this.getCollections();
  }
  getCollections() {
    this.props.dispatch(collectionsActions.getCollections());
  }
  renderCollections() {
    return this.props.collections.map(collection => (
      <div key={collection._id} className="col col-12 col-md-4 col-lg-4 mb-2">
        <Collection data={collection} />
      </div>
    ));
  }
  render() {
    return (
      <div className="Collections">
        <div className="container">
          <h2>Collections</h2>
          <div className="row">
            {this.renderCollections()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(Collections);
