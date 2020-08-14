import client from './client';

const login = (body) => {
  const endpoint = '/auth/login';
  return client.post(endpoint, body);
};

export default { login };
