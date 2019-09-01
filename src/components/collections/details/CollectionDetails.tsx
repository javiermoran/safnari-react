import React, { Dispatch } from 'react';
import { History } from 'history';
import { RouteComponentProps, match } from 'react-router';
import { connect } from 'react-redux';
import api from '../../../safnari.api';
import { ICollection } from '../../../models/ICollection';
import collectionActions from '../../../actions/collections.actions';
import './CollectionDetails.scss';
import Collection from '../collection/Collection';

interface ICollectionDetailsState {
  _id?: string;
  name?: string;
  breadcrumbs?: string[];
  icon?: string;
  children?: ICollection[]
}

interface ICollectionDetailsMatch {
  collectionId: string;
}

interface ICollectionDetailsProps extends RouteComponentProps {
  dispatch: Dispatch<any>;
  history: History;
  collections: ICollection[],
  match: match<ICollectionDetailsMatch>
}

class CollectionDetails extends React.Component<ICollectionDetailsProps, ICollectionDetailsState> {
  state = {
    _id: '',
    icon: '',
    name: '',
    children: []
  }
  componentDidMount(): void {
    const { collectionId } = this.props.match.params;
    this.getCollectionDetails(collectionId);
  }
  componentWillReceiveProps(nextProps: ICollectionDetailsProps): void {
    this.getChildCollections(nextProps.collections);
  }
  getChildCollections(collections: ICollection[]): void {
    const { collectionId } = this.props.match.params;
    const children = collectionActions.filterByParent(collections, collectionId);
    this.setState({ children });
  }
  getCollectionDetails(id: string): void {
    api.collections.get(id)
      .then((response) => {
      const { _id, name, breadcrumbs } = response.data;
      const { icon } = response.data.type;
      this.setState({ _id, name, breadcrumbs, icon });
      })
      .catch((error) => {
        this.props.history.push('/collections');
      });

    if (!this.props.collections.length) {
      this.props.dispatch(collectionActions.getCollections());
    } else {
      this.getChildCollections(this.props.collections);
    }
  }
  renderChildCollections(): JSX.Element[] {
    return this.state.children.map((child: ICollection) => (
      <div key={child._id} className="col col-12 col-md-4 col-lg-4 mb-2">
        <Collection data={child} />
      </div>
    ));
  }
  render(): JSX.Element {
    return (
      <div className="CollectionDetails">
        <div className="container">
          <h2 className="CollectionDetails__title">
            <i className={`fas ${this.state.icon}`}></i>
            {this.state.name}
          </h2>
          <h6>Collections:</h6>
          <div className="row">
            {this.renderChildCollections()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  collections: state.collections
});

export default connect(mapStateToProps)(CollectionDetails);
