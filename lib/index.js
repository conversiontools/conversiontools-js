const fs = require('fs');
const FormData = require('form-data');

const api = require('./api');

const createRequestBody = json => {
  const body = Object.keys(json).map(
    key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  ).join('&');
  return body;
};

const createFileRequestBody = filename => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filename));
  return form;
};

const createTask = (type, options) => {
  const url = 'tasks';
  const json = {
    type: type,
  };
  if (options.url) json.url = options.url;
  if (options.file_id) json.file_id = options.file_id;
  const body = createRequestBody(json);
  return api.requestAPI(url,
    {
      method: 'POST',
      body: body,
    },
    {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  );
};

const downloadFile = (fileId, filename) => {
  const url = 'files/' + encodeURIComponent(fileId);
  return api.requestAPIRaw(url, { method: 'GET' });
};

const downloadFileTo = (fileId, filename) => {
  console.log('Downloading file to', filename);
  const url = 'files/' + encodeURIComponent(fileId);
  const dest = fs.createWriteStream(filename);
  return api.requestAPIRaw(url, { method: 'GET' })
    .then(data => data.pipe(dest));
};

const getTaskStatus = (taskId) => {
  const url = 'tasks/' + encodeURIComponent(taskId);
  return api.requestAPI(url, { method: 'GET' });
};

const uploadFile = (filename) => {
  const url = 'files';
  const body = createFileRequestBody(filename);
  return api.requestAPI(url, { method: 'POST', body: body });
};

module.exports = {
  createTask: createTask,
  downloadFile: downloadFile,
  downloadFileTo: downloadFileTo,
  getTaskStatus: getTaskStatus,
  uploadFile: uploadFile,
};
