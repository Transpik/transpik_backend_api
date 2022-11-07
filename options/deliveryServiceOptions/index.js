const configChargesOpts = require('./configChargesOpts');
const requestVerifyOpts = require('./requestVerifyOpts');
const moveToDeliveringOpts = require('./moveToDeliveringOpts');
const moveToProcessingOpts = require('./moveToProcessingOpts');
const createDeliveryDriverOpts = require('./createDeliveryDriverOpts');

module.exports = { 
    requestVerifyOpts, 
    configChargesOpts,
    moveToDeliveringOpts,
    moveToProcessingOpts, 
    createDeliveryDriverOpts,
};