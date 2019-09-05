import { AnyAction } from "redux";

export default (state = [], action: AnyAction) => {
  switch(action.type) {
    case 'SET_COLLECTIONS':
      return [...action.collections];
    default:
      return [...state];
  }
}
