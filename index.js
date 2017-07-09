const api = require('./lib');
const conversion = require('./lib/conversion');

module.exports = {
  conversion: conversion.conversion,
  createTask: api.createTask,
  downloadFile: api.downloadFile,
  downloadFileTo: api.downloadFileTo,
  getTaskStatus: api.getTaskStatus,
  uploadFile: api.uploadFile,
};
