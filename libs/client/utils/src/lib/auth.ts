// set token to local storage
export function setToken(token: string) {
  localStorage.setItem('token', token);
}

// get token from local storage
export function getToken() {
  return localStorage.getItem('accessToken');
}

// set refresh token to local storage
export function setRefreshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

// get refresh token from local storage
export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

// set expires in to local storage
export function setExpiresIn(expiresIn: string) {
  localStorage.setItem('expiresIn', expiresIn);
}

// get expires in from local storage
export function getExpiresIn() {
  return localStorage.getItem('expiresIn');
}

export function setUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return null;
}

export function removeToken() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresIn');
}
