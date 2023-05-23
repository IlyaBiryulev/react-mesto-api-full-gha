class Api {
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
  baseUrl: 'https://api.mestofulldomen.nomoredomains.monster',
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
  },
});
