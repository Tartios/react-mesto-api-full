/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

class Api {
  constructor(options) {
    this._url = options.url;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // eslint-disable-next-line class-methods-use-this
  _getResponceData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },

      method: 'GET',
    }).then(this._getResponceData);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },

      method: 'GET',
    }).then(this._getResponceData);
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },

      method: 'PATCH',

      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponceData);
  }

  postNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },

      method: 'POST',

      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponceData);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },

      method: 'DELETE',

      body: JSON.stringify({
        id: cardId,
      }),
    }).then(this._getResponceData);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },

      method: 'PUT',
    }).then(this._getResponceData);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },

      method: 'DELETE',
    }).then(this._getResponceData);
  }

  setNewAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },

      method: 'PATCH',

      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponceData);
  }
}

// eslint-disable-next-line import/prefer-default-export
export const api = new Api({
  url: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3002'}`,
});
