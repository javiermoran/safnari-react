import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { IItem } from '../../../models/IItem';
import { Button, Typography } from '@material-ui/core';
import Confirm from '../../common/confirm/Confirm';
import AddItemLink from '../add-item-link/AddItemLink';
import { ICollection } from '../../../models/ICollection';
import itemsActions from '../../../actions/items.actions';
import './Item.scss';

interface IItemProps {
  item: IItem;
  dispatch: Dispatch<any>;
  collection: ICollection;
}

class Item extends React.Component<IItemProps> {
  deleteItem() {
    const id = this.props.item._id as string;
    this.props.dispatch(itemsActions.deleteItem(id));
  }
  render(): JSX.Element {
    const backgroundImage = {backgroundImage: `url(${this.props.item.picture})`};
    return (
      <div className="Item">
        <div className="Item__img" style={backgroundImage}></div>
        <div className="Item__content">
          <div className="Item__content__row">
            <Typography variant="subtitle2">{this.props.item.title}</Typography>
          </div>
          <div className="Item__content__row">
            <Typography variant="body2">{this.props.item.publisher}</Typography>
          </div>
        </div>
        <div className="Item__toolbox">
          <AddItemLink
            className="Item__toolbox__item"
            collection={this.props.collection}
            item={this.props.item}
          >
            <Button>
              <i className="far fa-edit"></i>
              <span className="label">Edit</span>
            </Button>
          </AddItemLink>
          <Confirm
            className="Item__toolbox__item"
            title="Delete item"
            content="Are you sure you want to delete the item?"
            onConfirm={this.deleteItem.bind(this)}
          >
            <Button color="secondary">
              <i className="far fa-trash-alt"></i>
              <span className="label">Delete</span>
            </Button>
          </Confirm>
        </div>
      </div>
    );
  }
}

export default connect()(Item);
