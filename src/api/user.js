import http from './http';

const createUser = (body) => {
  const endpoint = '/users';
  return http.post(endpoint, body);
};

export default { createUser };
