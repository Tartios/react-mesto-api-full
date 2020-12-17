const BASE_URL = 'http://localhost:3002';

const checkResponse = (response) => (response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));

const register = (password, email) => fetch(`${BASE_URL}/sign-in`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(checkResponse);

const authorize = (password, email) => fetch(`${BASE_URL}/sign-up`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(checkResponse);

const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(checkResponse);

export { register, authorize, getContent };
