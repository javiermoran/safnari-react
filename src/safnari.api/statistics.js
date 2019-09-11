import core from './core';
import endpoints from './endpoints';

const getCounts = () => {
  const url = endpoints.statistics.counts;
  return core.get(url);
};

export default {
  getCounts
}
