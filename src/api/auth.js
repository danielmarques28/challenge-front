import http from './http';

const login = (body) => {
  const endpoint = '/auth/login';
  return http.post(endpoint, body);
};

export default { login };
