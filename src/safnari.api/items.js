import core from './core';
import endpoints from './endpoints';

const get = () => {
  return core.get(endpoints.items.items);
};

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
  create,
  update,
  delete: remove
}
