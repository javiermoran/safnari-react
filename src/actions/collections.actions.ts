import api from '../safnari.api';
import { ICollection } from '../models/ICollection';
import { Dispatch, Action } from 'redux';

let collections: ICollection[] = [];

export const getCollections = () => {
  return (dispatch: Dispatch<Action>) => {
    if (collections.length) {
      dispatch(setCollections(collections));
    } else {
      api.collections.get().then((response) => {
        collections = [...response.data.data];
        dispatch(setCollections(response.data.data));
      });
    }
  };
}

export const setCollections = (collections: ICollection[]) => ({
    type: 'SET_COLLECTIONS',
    collections
});

/** Helpers */
export function filterByParent(collections: ICollection[], parentId?: string): ICollection[] {
  return collections.filter((col: ICollection) =>  !parentId ? !col.parent : col.parent === parentId);
}

export function findById(collections: ICollection[], id: string): ICollection {
  const index = collections.findIndex((collection: ICollection) => collection._id === id);
  return collections[index];
}

export default {
  getCollections,
  filterByParent,
  findById
}
