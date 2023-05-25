const BASE_URL = "https://api.mestofulldomen.nomoredomains.monster";

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

export function register( email, password ) {
  return makeRequest("/signup", "POST", { email, password });
}

export function authorize({ email, password }) {
  return makeRequest("/signin", "POST", { email, password });
}

export function logout() {
  return makeRequest("/users/me", "DELETE");
}

export function getContent() {
  return makeRequest("/users/me", "GET");
}

export function getUserInfo() {
  return makeRequest("/users/me", "GET");
}

export function setUserInfo({ name, about }) {
  return makeRequest("/users/me", "PATCH", { name, about });
}

export function setUserAvatar({ avatar }) {
  return makeRequest("/users/me/avatar", "PATCH", { avatar });
}

export function getInitialCards() {
  return makeRequest("/cards", "GET");
}

export function addCard({ name, link }) {
  return makeRequest("/cards", "POST", { name, link });
}

export function deleteCard(id) {
  return makeRequest(`/cards/${id}`, "DELETE");
}

export function changeLikeCardStatus(id, isLiked) {
  let method;
  isLiked ? (method = "DELETE") : (method = "PUT");
  return makeRequest(`/cards/${id}/likes`, method);
}

