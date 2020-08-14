import client from './client';

const createUser = (body) => {
  const endpoint = '/users';
  return client.post(endpoint, body);
};

export default { createUser };
