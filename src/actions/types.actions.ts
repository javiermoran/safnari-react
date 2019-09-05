import api from '../safnari.api';
import { Dispatch } from 'react';
import { Action, AnyAction } from 'redux';
import { IType } from '../models/IType';

let types: IType[] = [];

export const getTypes = () => {
  return (dispatch: Dispatch<Action>) => {
    if (types.length) {
      dispatch(setTypes(types));
    } else {
      api.types.get().then((response) => {
        types = response.data.data
        dispatch(setTypes(types));
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};

export const setTypes = (types: IType[]) : AnyAction => ({
  type: 'SET_TYPES',
  types
});

export default {
  getTypes
};
