export function getAuth() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return { token, role };
}

export function isAuthenticated() {
  const { token } = getAuth();
  return !!token;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}
