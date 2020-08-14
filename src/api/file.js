import http from './http';

const listUserFiles = () => {
  const endpoint = '/files';
  return http.get(endpoint);
};

const downloadFile = (id) => {
  const endpoint = `/files/${id}`;
  return http.get(endpoint);
}

const uploadFile = (formData) => {
  const endpoint = '/files';
  http.defaults.headers['Content-Type'] = 'multipart/form-data';
  return http.post(endpoint, formData);
}

export default { listUserFiles, downloadFile, uploadFile };
