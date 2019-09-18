import Axios from 'axios';

function setAuthHeader(config) {
  const token = localStorage.getItem('authToken');
  return { 
    ...config, 
    headers: { ...config.headers, Authorization: `Bearer ${token}` } 
  };
}

function removeToken() {
  console.info('Remove Token');
  localStorage.removeItem('authToken');
}

export const post = (url, body, config = {}, auth = true) => {
  return new Promise((resolve, reject) => {
    if(auth) {
      config = setAuthHeader(config);
    }
  
    Axios.post(url, body, config)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      const response = error.response;
      if(auth && response.status === 401) {
        removeToken();
      }
      reject(response);
    });
  });
}

export const patch = (url, body, config = {}, auth = true) => {
  return new Promise((resolve, reject) => {
    if(auth) {
      config = setAuthHeader(config);
    }
  
    Axios.patch(url, body, config)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.log(error);
      if(auth && error.status === 401) {
        removeToken();
      }
      reject(error);
    });
  });
}

export const remove = (url, config = {}, auth = true) => {
  return new Promise((resolve, reject) => {
    if(auth) {
      config = setAuthHeader(config);
    }

    Axios.delete(url, config)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      if(auth && error.response.status === 401) {
        removeToken();
      }
      reject(error);
    });
  });
}

export const get = (url, config = {}, auth = true) => {
  return new Promise((resolve, reject) => {
    if(auth) {
      config = setAuthHeader(config);
    }

    Axios.get(url, config)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      if(auth && error.response.status === 401) {
        removeToken();
      }
      reject(error);
    });
  });
}

export default {
  post,
  patch,
  get,
  delete: remove
}
