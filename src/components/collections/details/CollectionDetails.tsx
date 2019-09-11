import api from '../../../safnari.api';
import React, { Dispatch } from 'react';
import { History } from 'history';
import { RouteComponentProps, match } from 'react-router';
import { connect } from 'react-redux';
import { ICollection } from '../../../models/ICollection';
import collectionActions from '../../../actions/collections.actions';
import itemActions from '../../../actions/items.actions';
import Collection from '../collection/Collection';
import Item from '../../items/item/Item';
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs';
import AddItemLink from '../../items/add-item-link/AddItemLink';
import { Typography, Button } from '@material-ui/core';
import { IItem } from '../../../models/IItem';
import './CollectionDetails.scss';
import AddCollection from '../add-collection/AddCollection';

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
  match: match<ICollectionDetailsMatch>,
  items: IItem[]
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
  componentDidMount() {
    const { collectionId } = this.props.match.params;
    this.getCollectionDetails(collectionId);
  }
  componentWillReceiveProps(nextProps: ICollectionDetailsProps): void {
    if (nextProps.collections) {
      this.getChildCollections(nextProps.collections);
    }
    if (nextProps.match.params.collectionId !== this.props.match.params.collectionId) {
      this.getCollectionDetails(nextProps.match.params.collectionId);
      this.props.dispatch(itemActions.clearItems());
    }
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
        this.getCollectionItems(_id);
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
      <div key={child._id} className="col col-12 col-md-4 col-lg-3 mb-2">
        <Collection data={child} />
      </div>
    ));
    return (
      <div>
        <Typography variant="h6">Collections:</Typography>
        <div className="row">
          {children}
        </div>
      </div>
    );
  }
  renderItems(): JSX.Element {
    return (
      <div>
        <Typography variant="h6">Items:</Typography>
        <div className="row">
          {this.props.items.map((item) => (
            <div key={item._id} className="col col-12 col-md-3 mb-2">
              <Item item={item} collection={this.state.collection} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  render(): JSX.Element {
    return (
      <div className="CollectionDetails">
        <div className="container">
          <Breadcrumbs data={this.state.breadcrumbs} />
          <div className="CollectionDetails__header">
            <Typography variant="h2" className="CollectionDetails__title">
              <i className={`fas ${this.state.icon}`}></i>
              {this.state.name}
            </Typography>
            <div className="CollectionDetails__header__buttons">
              <AddItemLink collection={this.state.collection}>
                <Button variant="contained" color="primary">
                  <i className="fas fa-plus mr-1"></i> Item
                </Button>
              </AddItemLink>
              <AddCollection parent={this.state.collection}>
                <Button variant="contained" color="primary">
                  <i className="fas fa-plus mr-1"></i> Collection
                </Button>              
              </AddCollection>
            </div>
          </div>
          { !!this.state.children.length && this.renderChildCollections() }
          { !!this.props.items.length && this.renderItems() }
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
