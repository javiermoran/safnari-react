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

export default {
  getItems,
  saveItem,
  clearItems
}
