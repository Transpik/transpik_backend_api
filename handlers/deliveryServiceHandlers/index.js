const configHandlers = require('./configs');
const verificationHandlers = require('./verification');
const changeStageHandlers = require('./orders');

module.exports = {
    ...configHandlers,
    ...verificationHandlers,
    ...changeStageHandlers,
};