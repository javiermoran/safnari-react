import { AnyAction } from "redux";
import { IType } from "../models/IType";

export default (state: IType[] = [], action: AnyAction): IType[] => {
  switch(action.type) {
    case 'SET_TYPES':
      return [...action.types];
    default:
      return [...state];
  }
};
