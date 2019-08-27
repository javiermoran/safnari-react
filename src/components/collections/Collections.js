import React from 'react';
import { connect } from 'react-redux';
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
      <span key={collection._id}>
        {collection.name}
      </span>
    ));
  }
  render() {
    return (
      <div className="Collections">
        <div className="container">
          <h2>Collections</h2>
          {this.renderCollections()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(Collections);
