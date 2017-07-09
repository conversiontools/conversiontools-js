const fetch = require('node-fetch');

const API_BASE_URL = 'https://conversiontools.io/api/';

const requestAPI = (url, params, headers) => {
  // console.log('requestAPI:', url, params);
  const request = {
    method: params.method || 'GET',
    mode: 'cors',
  };
  if (headers) request.headers = headers;

  if (params.method === 'POST' && params.body) {
    request.body = params.body;
  }

  // console.log('requestAPI.request', request);

  return fetch(API_BASE_URL + url, request)
    .then((res) => {
      // console.log('result', res);
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.status + ' ' + res.statusText);
        const err = new Error(res.status + ' ' + res.statusText);
        err.code = 0;
        err.status = res.status;
        err.statusText = res.statusText;
        throw err;
      }
    })
    .then((res) => {
      // console.log('requestAPI.result:', res);
      if (res.code !== 0) {
        const err = new Error(res.message);
        err.code = res.code;
        throw err;
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

const requestAPIRaw = (url) => {
  // console.log('requestAPIRaw:', url);
  const request = {
    method: 'GET',
    mode: 'cors',
  };
  return fetch(API_BASE_URL + url, request)
    .then((res) => {
      if (res.ok) {
        return res.body;
      } else {
        console.log(res.status + ' ' + res.statusText);
        const err = new Error(res.status + ' ' + res.statusText);
        err.code = 0;
        err.status = res.status;
        err.statusText = res.statusText;
        throw err;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  requestAPI: requestAPI,
  requestAPIRaw: requestAPIRaw,
};
