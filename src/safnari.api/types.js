import core from './core';
import endpoints from './endpoints';

const get = () => {
  return core.get(endpoints.types.types, {}, false);
};

export default {
  get
}
