import api from '../safnari.api';

export const getCollections = () => {
  return (dispatch) => {
    api.collections.get().then((response) => {
      dispatch(refreshCollections(response.data.data));
    })
  };
}

export const refreshCollections = collections => ({
    type: 'REFRESH_COLLECTIONS',
    collections
});

export default {
  getCollections
}
