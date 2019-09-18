import uuid from 'uuid';
import { Dispatch, AnyAction } from 'redux';

export const addAlert = (message: string, type: string) => {
  const alert = { id: uuid(), message, type };
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(createAlert(alert));
    setTimeout(() => { 
      dispatch(removeAlert(alert.id))
    }, 7000);
  }
};

export const  createAlert = (alert: any): AnyAction => {
  return {
    type: 'ADD_ALERT',
    alert
  }
};

export const removeAlert = (id: string): AnyAction => {
  return {
    type: 'REMOVE_ALERT',
    alert: { id }
  }
};

export default {
  addAlert,
  removeAlert
};
