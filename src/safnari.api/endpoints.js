export const BASEPATH = process.env.REACT_APP_API_BASEPATH || 'https://safnari.herokuapp.com/api';

export const users = {
  token: `${BASEPATH}/users/token`,
  users:  `${BASEPATH}/users`,
  me:  `${BASEPATH}/users/me`
};

export const types = {
  types: `${BASEPATH}/types`
};

export default {
  BASEPATH,
  users,
  types
}