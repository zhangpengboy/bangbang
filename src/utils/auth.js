import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getStore(key) {
  return localStorage.getItem(key)
}

export function setStore(key,vlaue) {
  localStorage.setItem(key, vlaue)
}