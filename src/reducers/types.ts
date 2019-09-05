import { AnyAction } from "redux";

export default (state = [], action: AnyAction) => {
  switch(action.type) {
    case 'SET_TYPES':
      return [...action.types];
    default:
      return [...state];
  }
};
