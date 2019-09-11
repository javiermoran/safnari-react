export const BASEPATH = process.env.REACT_APP_API_BASEPATH || 'https://safnari.herokuapp.com/api';

export const users = {
  token: `${BASEPATH}/users/token`,
  users:  `${BASEPATH}/users`,
  me:  `${BASEPATH}/users/me`
};

export const types = {
  types: `${BASEPATH}/types`
};

export const collections = {
  collections: `${BASEPATH}/collections`,
  collection: `${BASEPATH}/collections/:id`
};

export const items = {
  items: `${BASEPATH}/items`,
  item: `${BASEPATH}/items/:id`
};

export const statistics = {
  counts: `${BASEPATH}/statistics/counts`
}

const transform = (endpoint, params) => {
  let route = endpoint;
  const keys = Object.keys(params);
  keys.forEach((key) => {
    route = route.replace(`:${key}`, params[key]);
  });
  return route;
};

export default {
  BASEPATH,
  transform,
  users,
  types,
  collections,
  statistics,
  items
};