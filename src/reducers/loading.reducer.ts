import { AnyAction } from "redux";
import { ILoading } from "../models/ILoading";

const defaultState: ILoading = {
  global: false,
  collections: false,
  items: false,
  types: false,
  user: false
};

export default (state: ILoading = defaultState, action: AnyAction): ILoading => {
  switch(action.type) {
    case 'TURN_LOADING_ON':
      return { ...state, [action.loader]: true };
    case 'TURN_LOADING_OFF':
      return { ...state, [action.loader]: false };
    default:
      return { ...state };
  }
}
