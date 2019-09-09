import { AnyAction } from "redux";
import { ICollection } from '../models/ICollection';

export default (state: ICollection[] = [], action: AnyAction): ICollection[] => {
  switch(action.type) {
    case 'SET_COLLECTIONS':
      return [...action.collections];
    case 'ADD_COLLECTION':
      return [...state, action.collection];
    default:
      return [...state];
  }
}
