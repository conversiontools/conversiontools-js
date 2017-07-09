const conversionTools = require('./');

const FILENAME = 'test.csv';

// conversionTools.conversion('convert.csv2xml',
//   {
//     filename: FILENAME,
//     timeout: 3000,
//     outputFilename: 'test.csv.xml',
//   }
// );

// conversionTools.conversion('convert.url2img',
//   {
//     url: 'http://google.de',
//     timeout: 3000,
//     outputFilename: 'google.png',
//   }
// );

conversionTools.conversion('convert.xml2xls',
  {
    filename: 'test.csv.xml',
    timeout: 3000,
    outputFilename: 'test.csv.xml.xlsx',
  }
);

// const checkStatus = (taskId) => {
//   return conversionTools
//     .getTaskStatus(taskId)
//     .then((res) => {
//       console.log('res', res);
//       switch (res.status) {
//         case 'SUCCESS':
//           return conversionTools.downloadFileTo(res.file_id, FILENAME + '.xml');
//         case 'FAILED':
//           break;
//         case 'PENDING':
//         case 'RUNNING':
//           // still running, need to set timeout
//           setTimeout(checkStatus.bind(this, taskId), 3000);
//           break;
//       }
//     })
//     .catch((err) => {
//       console.log('err', err);
//     });
// };

// conversionTools
//   .uploadFile(FILENAME)
//   .then((res) => {
//     return conversionTools.createTask('convert.csv2xml', {
//       file_id: res.file_id,
//     });
//   })
//   .then((res) => {
//     console.log('createTask.Result:', res);
//     if (res) {
//       return checkStatus(res.task_id);
//     }
//   })
//   .catch((err) => {
//     console.log('createTask.Error:', err);
//   });

// conversionTools
//   .createTask('convert.url2csv')
//   .then((res) => {
//     console.log('createTask.Result:', res);
//     if (res) {
//       return checkStatus(res.task_id);
//     }
//   })
//   .then(() => {
//     console.log('after checkStatus');
//   })
//   .catch((err) => {
//     console.log('createTask.Error:', err);
//   });

// const taskId = '593eab3e96f06e400e6f3f32';
// checkStatus(taskId);
