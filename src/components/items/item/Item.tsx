import React from "react";
import { IItem } from "../../../models/IItem";
import { Button, Typography } from "@material-ui/core";
import Confirm from "../../common/confirm/Confirm";
import AddItemLink from "../add-item-link/AddItemLink";
import itemsActions from "../../../actions/items.actions";
import { IType } from "../../../models/IType";
import { NavLink } from "react-router-dom";
import "./Item.scss";

const Item = ({ item, collection, dispatch = (id: any) => {}}) => {
  function deleteItem() {
    const id = item._id as string;
    dispatch(itemsActions.deleteItem(id));
  }
  function isBook(item: IItem): boolean {
    const { name } = item.type as IType;
    return name === "cbook" || name === "book";
  }
  const backgroundImage = { backgroundImage: `url(${item.picture})` };
  const className = `Item ${isBook(item) && "Item--book"}`;
  return (
    <div className={className}>
      <div className="Item__img" style={backgroundImage}></div>
      <div className="Item__content">
        <div className="Item__content__row">
          <Typography variant="subtitle2">{item.title}</Typography>
        </div>
        <div className="Item__content__row">
          <Typography variant="body2">{item.publisher}</Typography>
        </div>
        <div className="Item__content__row">
          <NavLink to={`/items/${item._id}`}>Details</NavLink>
        </div>
      </div>
      <div className="Item__toolbox">
        <AddItemLink
          className="Item__toolbox__item"
          collection={collection}
          item={item}
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
          onConfirm={deleteItem}
        >
          <Button color="secondary">
            <i className="far fa-trash-alt"></i>
            <span className="label">Delete</span>
          </Button>
        </Confirm>
      </div>
    </div>
  );
};

export default Item;
