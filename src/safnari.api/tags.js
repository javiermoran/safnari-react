import core from './core';
import endpoints from './endpoints';

const create = (tag) => {
  return core.post(endpoints.tags.base, tag);
};

const get = () => {
  return core.get(endpoints.tags.base, {});
};

const getItems = (id) => {
  const url = endpoints.tags.items;
  const endpoint = endpoints.transform(url, { id });
  return core.get(endpoint, {}, true);
}

export default {
  get,
  getItems,
  create
}