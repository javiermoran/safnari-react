import api from '../../../safnari.api';
import React, { Dispatch } from 'react';
import { History } from 'history';
import { RouteComponentProps, match } from 'react-router';
import { connect } from 'react-redux';
import { ICollection } from '../../../models/ICollection';
import collectionActions from '../../../actions/collections.actions';
import itemActions from '../../../actions/items.actions';
import Collection from '../collection/Collection';
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs';
import AddItemLink from '../../items/add-item-link/AddItemLink';
import './CollectionDetails.scss';

interface ICollectionDetailsState {
  _id?: string;
  name?: string;
  breadcrumbs?: string[];
  icon?: string;
  typeId?: string;
  children?: ICollection[];
  collection?: ICollection;
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
    children: [],
    typeId: '',
    breadcrumbs: [],
    collection: {} as ICollection
  }
  componentDidMount(): void {
    const { collectionId } = this.props.match.params;
    this.getCollectionDetails(collectionId);
    this.getCollectionItems(collectionId);
  }
  componentWillReceiveProps(nextProps: ICollectionDetailsProps): void {
    this.getCollectionDetails(nextProps.match.params.collectionId);
  }
  componentWillUnmount() {
    this.props.dispatch(itemActions.clearItems());
  }
  getChildCollections(collections: ICollection[]): void {
    const { collectionId } = this.props.match.params;
    const children = collectionActions.filterByParent(collections, collectionId);
    this.setState({ children });
  }
  getCollectionDetails(id: string): void {
    if (!this.props.collections.length) {
      this.props.dispatch(collectionActions.getCollections());
    }
    
    api.collections.get(id)
      .then((response) => {
        const { _id, name, breadcrumbs } = response.data;
        const { icon } = response.data.type;
        this.setState({ _id, name, breadcrumbs, icon, collection: response.data });
        this.getChildCollections(this.props.collections);
      })
      .catch((error) => {
        this.props.history.push('/collections');
      });
  }
  getCollectionItems(id: string) {
    this.props.dispatch(itemActions.getItems(id));
  }
  renderChildCollections(): JSX.Element {
    const children = this.state.children.map((child: ICollection) => (
      <div key={child._id} className="col col-12 col-md-4 col-lg-4 mb-2">
        <Collection data={child} />
      </div>
    ));
    if (children.length) {
      return (
        <div>
          <h6>Collections:</h6>
          <div className="row">
            {children}
          </div>
        </div>
      )
    } else {
      return <div></div>;
    }
  }
  render(): JSX.Element {
    return (
      <div className="CollectionDetails">
        <div className="container">
          <Breadcrumbs data={this.state.breadcrumbs} />
          <h2 className="CollectionDetails__title">
            <i className={`fas ${this.state.icon}`}></i>
            {this.state.name}
          </h2>
          <AddItemLink collection={this.state.collection} />
          {this.renderChildCollections()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  collections: state.collections,
  items: state.items
});

export default connect(mapStateToProps)(CollectionDetails);
