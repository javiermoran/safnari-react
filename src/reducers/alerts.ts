import { AnyAction } from "redux";
import { IAlert } from '../models/IAlert';

export default (state = [], action: AnyAction) => {
  switch(action.type) {
    case 'ADD_ALERT':
      return [...state, action.alert];
    case 'REMOVE_ALERT':
      return state.filter((alert: IAlert) => alert.id !== action.alert.id);
    default:
      return state;
  }
}
