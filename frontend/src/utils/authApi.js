export const BASE_URL = 'https://api.mestofulldomen.nomoredomains.monster';

const makeRequest = (url, method, body, token) => {
  const headers = {'Content-Type': 'application/json'};
  const config = {method, headers};

  if(token !== undefined) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if(body !== undefined) {
    config.body = JSON.stringify(body)
  }

  return fetch(`${BASE_URL}${url}`, config).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    };
  });
}

export const register = (email, password) => {
  return makeRequest('/signup', 'POST', { email, password })
};

export const authorize = (email, password) => {
  return makeRequest('/signin', 'POST', { email, password })
};

export const getContent = (token) => {
  return makeRequest('/users/me', 'GET', undefined, token)
};
