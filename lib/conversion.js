const {
  createTask,
  getTaskStatus,
  downloadFileTo,
  uploadFile,
} = require('./index');
const conversions = require('./conversions');

const waitTask = (taskId, { filename, timeout = 3000 }) =>
  getTaskStatus(taskId)
    .then(res => {
      console.log('Got Status:', res.status);
      switch (res.status) {
        case 'SUCCESS':
          return downloadFileTo(res.file_id, filename);

        case 'FAILED':
          // console.log(res.status);
          return reject('Failed to process conversion');

        case 'PENDING':
        case 'RUNNING':
          // still running, set timeout to check again
          return setTimeout(waitTask, timeout, taskId, { filename, timeout });
      }
    })
    .catch(err => console.log('Error', err));

const conversion = (conversionName, { filename, url, outputFilename, timeout }) => {
  const conversion = conversions[conversionName];
  let conversionPromise;

  if (!conversion) {
    console.log('Conversion', conversionName, 'was not found');
    return;
  }
  if (typeof outputFilename === 'undefined') {
    outputFilename = `${filename}.${conversion.outputExtension}`;
  }

  if (conversion.isFileRequired) {
    console.log('Uploading file', filename);
    conversionPromise = uploadFile(filename)
      .then(res => {
        console.log('Creating conversion task', conversionName, 'for file', filename);
        return createTask(conversionName, {
          file_id: res.file_id,
        });
      });
  }

  if (conversion.isUrlRequired) {
    console.log('Creating conversion task', conversionName, 'for url', url);
    conversionPromise = createTask(conversionName, {
      url: url,
    });
  }

  conversionPromise
    .then(res => {
      // console.log('conversionPromise.res', res);
      if (res) {
        // return checkTaskStatus(res.task_id, { filename: outputFilename, timeout });
        console.log('Waiting conversion task to be finished..');
        return waitTask(res.task_id, { filename: outputFilename, timeout });
      }
    })
    .catch((err) => {
      console.log('createTask.Error:', err);
    });
};

module.exports = {
  conversion,
};
