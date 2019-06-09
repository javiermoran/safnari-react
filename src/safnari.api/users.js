import endpoints from './endpoints';
import core from './core';

const create = (user) => {
  return core.post(endpoints.users.users, user, {}, false);
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    core.post(endpoints.users.token, { email, password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const logout = () => {
  return new Promise((resolve, reject) => {
    core.delete(endpoints.users.token)
      .then(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};

const me = () => {
  return core.get(endpoints.users.me);
}

export default {
  create,
  login,
  logout,
  isLoggedIn,
  me
}