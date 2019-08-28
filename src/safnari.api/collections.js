import core from './core';
import endpoints from './endpoints';

const get = id => {
  if (id) {
    const url = endpoints.collections.collection;
    const endpoint = endpoints.transform(url, { id });  
    return core.get(endpoint);
  }

  return core.get(endpoints.collections.collections);
};

const create = (collection) => {
  return core.post(endpoints.collections.collections, collection);
};

const update = (id, collection) => {
  const url = endpoints.collections.collection;
  const endpoint = endpoints.transform(url, { id });
  return core.patch(endpoint, collection);
};

const remove = (id) => {
  const url = endpoints.collections.collection;
  const endpoint = endpoints.transform(url, { id });
  return core.delete(endpoint);
};

export default {
  get,
  create,
  update,
  delete: remove
}
