import { AnyAction } from 'redux';

export default (state = [], action: AnyAction) => {
  switch(action.type) {
    case 'CLEAR_ITEMS':
      return [];
    case 'SET_ITEMS':
      return [...action.items];
    case 'ADD_ITEM':
      return [...state, action.item];
    default:
      return [...state];
  }
}
