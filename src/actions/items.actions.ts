import api from '../safnari.api';
import { IItem } from '../models/IItem';
import { Dispatch, AnyAction } from 'redux';

export const getItems = (collectionId: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    api.items.getByCollection(collectionId).then((response) => {
      dispatch(setItems([...response.data.data]));
    });
  }
};

export const saveItem = (item: IItem) => {
  return (dispatch: Dispatch<AnyAction>) => {
    api.items.create(item).then((response) => {
      dispatch(addItem(response.data));
    });
  }
};

export const updateItem = (id: string, item: IItem) => {
  return (dispatch: Dispatch<AnyAction>) => {
    api.items.update(id, item).then((response) => {
      dispatch(replaceItem(response.data));
    });
  }
};

export const deleteItem = (id: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    api.items.delete(id).then(() => {
      dispatch(removeItem(id));
    });
  };
}

export const clearItems = () => ({
  type: 'CLEAR_ITEMS'
});

export const setItems = (items: IItem[]): AnyAction => ({
  type: 'SET_ITEMS',
  items
});

export const addItem = (item: IItem): AnyAction => ({
  type: 'ADD_ITEM',
  item
});

export const replaceItem = (item: IItem): AnyAction => ({
  type: 'REPLACE_ITEM',
  item
});

export const removeItem = (id: string): AnyAction => ({
  type: 'REMOVE_ITEM',
  id
});

export default {
  getItems,
  saveItem,
  updateItem,
  deleteItem,
  clearItems
}
