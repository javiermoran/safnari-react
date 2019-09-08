import { AnyAction } from 'redux';
import { IItem } from '../models/IItem';

export default (state = [], action: AnyAction) => {
  switch(action.type) {
    case 'CLEAR_ITEMS':
      return [];
    case 'SET_ITEMS':
      return [...action.items];
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REPLACE_ITEM':
      return state.map((item: IItem) => item._id === action.item._id ? action.item : item);
    case 'REMOVE_ITEM':
      return state.filter((item: IItem) => item._id !== action.id);
    default:
      return [...state];
  }
}
