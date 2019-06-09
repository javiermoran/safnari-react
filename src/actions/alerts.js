import uuid from 'uuid';

export const addAlert = (message, type) => {
  const alert = { id: uuid(), message, type };
  return {
    type: 'ADD_ALERT',
    alert
  }
};

export default {
  addAlert
};
