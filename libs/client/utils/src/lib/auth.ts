export function setUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return null;
}

export function removeUser() {
  localStorage.removeItem('user');
}
