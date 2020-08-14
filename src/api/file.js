import client from './client';

const listUserFiles = () => {
  const endpoint = '/files';
  return client.get(endpoint);
};

const downloadFile = (id) => {
  const endpoint = `/files/${id}`;
  return client.get(endpoint);
}

const uploadFile = (formData) => {
  const endpoint = '/files';
  client.defaults.headers['Content-Type'] = 'multipart/form-data';
  return client.post(endpoint, formData);
}

export default { listUserFiles, downloadFile, uploadFile };
