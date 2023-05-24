const BASE_URL = "https://api.mestofulldomen.nomoredomains.monster";

// MAKE REQUEST TO THE SERVER
function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
}

// REGISTRATION USER
export function register( email, password ) {
  return makeRequest("/signup", "POST", { email, password });
}

// AUTHORIZATION USER
export function authorize({ email, password }) {
  return makeRequest("/signin", "POST", { email, password });
}

// LOGOUT USER
export function logout() {
  return makeRequest("/users/me", "DELETE");
}

// GET USER CONTENT FROM THE SERVER
export function getContent() {
  return makeRequest("/users/me", "GET");
}

// GET USER INFO
export function getUserInfo() {
  return makeRequest("/users/me", "GET");
}

// SEND USER INFO
export function setUserInfo({ name, about }) {
  return makeRequest("/users/me", "PATCH", { name, about });
}

// SET USER AVATAR
export function setUserAvatar({ avatar }) {
  return makeRequest("/users/me/avatar", "PATCH", { avatar });
}

// GET INITIAL CARDS
export function getInitialCards() {
  return makeRequest("/cards", "GET");
}

// SEND NEW CARD INFO
export function addCard({ name, link }) {
  return makeRequest("/cards", "POST", { name, link });
}

// DELETE CARD
export function deleteCard(id) {
  return makeRequest(`/cards/${id}`, "DELETE");
}

// CHANGE LIKE CARD STATUS
export function changeLikeCardStatus(id, isLiked) {
  let method;
  isLiked ? (method = "DELETE") : (method = "PUT");
  return makeRequest(`/cards/${id}/likes`, method);
}

/* class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _headersDataToken = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`
    return this._headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      headers: this._headersDataToken()
    })
    .then(res => {
      return this._getResponse(res)
    });
  }

  getInitialCards() {
    const url = this._baseUrl + `/cards`;
    return fetch(url , {
    headers: this._headersDataToken()
  })
    .then(res => {
      return this._getResponse(res);
    });
  }

  addCard(popupInputsValue) {
    const url = this._baseUrl + `/cards`;
    return fetch(url, {
      method: 'POST',
      headers: this._headersDataToken(),
      body: JSON.stringify(popupInputsValue)
    })
    .then(res => {
      return this._getResponse(res)
    });
  }

  deleteCard(id) {
    const url = this._baseUrl + `/cards/${id}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headersDataToken()
    })
    .then(res => {
      return this._getResponse(res)
    });
  }

  setCardLike(id) {
    const url = this._baseUrl + `/cards/${id}/likes`;
    return fetch(url, {
      method: 'PUT',
      headers: this._headersDataToken()
    })
    .then(res => {
      return this._getResponse(res)
    });
  }

  deleteCardLike(id) {
    const url = this._baseUrl + `/cards/${id}/likes`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headersDataToken()
    })
    .then(res => {
      return this._getResponse(res)
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked){
      return this.setCardLike(id)
    } else {
      return this.deleteCardLike(id)
    }
  }

  setUserInfo(popupInputsValue) {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headersDataToken(),
      body: JSON.stringify(popupInputsValue)
    })
    .then(res => {
      return this._getResponse(res)
    });
  }

  setUserAvatar(link) {
    const url = this._baseUrl + `/users/me/avatar`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headersDataToken(),
      body: JSON.stringify({
        "avatar": link
      })
    })
    .then(res => {
      return this._getResponse(res)
    });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  },
});
 */
