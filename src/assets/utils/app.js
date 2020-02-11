import Cookie from 'cookie_js';
const tokenName = "token";
const userName = "username";
export function getToken(){
  return Cookie.get(tokenName);
}
export function setToken(data){
  return Cookie.set(tokenName,data);
}
export function removeToken(){
  return Cookie.remove(tokenName);
}
export function setUsername(data){
  return Cookie.set(userName,data);
}
export function getUsername(){
  return Cookie.get(userName);
}
