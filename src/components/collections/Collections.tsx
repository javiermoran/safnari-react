import React from 'react';
import { connect } from 'react-redux';
import Collection from './collection/Collection';
import collectionsActions from '../../actions/collections.actions';
import { ICollection } from '../../models/ICollection';
import { Dispatch } from 'redux';
import AddCollection from './add-collection/AddCollection';
import { Button, Typography } from '@material-ui/core';
import { ILoading } from '../../models/ILoading';
import Loading from '../common/loading/Loading';
import withAuth from '../common/authorized/withAuth';
import EmptyState from '../common/empty-state/EmptyState';
import './Collections.scss';

interface ICollectionsProps {
  collections: ICollection[];
  dispatch: Dispatch<any>;
  loading?: ILoading
}

class Collections extends React.Component<ICollectionsProps> {
  componentDidMount() {
    this.getCollections();
  }
  getCollections() {
    this.props.dispatch(collectionsActions.getCollections());
  }
  renderCollections() {
    const collections: ICollection[] = collectionsActions.filterByParent(this.props.collections);

    if (!collections.length) {
      return (
        <div className="col">
          <EmptyState message="No collections found"></EmptyState>
        </div>
      );
    }

    return collections.map(collection => (
      <div key={collection._id} className="col col-12 col-md-4 col-lg-4 mb-2">
        <Collection data={collection} />
      </div>
    ));
  }
  render(): JSX.Element {
    return (
      <div className="Collections">
        <div className="container">
          <div className="Collections__header">
            <Typography variant="h2">Collections</Typography>
            <AddCollection>
              <Button color="primary" variant="contained">
                <i className="fas fa-plus mr-1"></i> Collection
              </Button>
            </AddCollection>
          </div>
          <div className="row">
            {this.props.loading && this.props.loading.collections && <Loading />}
            {this.renderCollections()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  collections: state.collections,
  loading: state.loading
});

export default connect(mapStateToProps)(withAuth(Collections));
