import core from './core';
import endpoints from './endpoints';

const get = (id) => {
  const url = endpoints.items.item;
  const endpoint = id ? endpoints.transform(url, { id }) : url; 
  return core.get(endpoint);
};

const getByCollection = (collectionId) => {
  const endpoint = `${endpoints.items.items}?collection=${collectionId}`;
  return core.get(endpoint);
}

const create = (item) => {
  return core.post(endpoints.items.items, item);
};

const update = (id, item) => {
  const url = endpoints.items.item;
  const endpoint = endpoints.transform(url, { id });
  return core.patch(endpoint, item);
};

const remove = (id) => {
  const url = endpoints.items.item;
  const endpoint = endpoints.transform(url, { id });
  return core.delete(endpoint);
};

export default {
  get,
  getByCollection,
  create,
  update,
  delete: remove
}
