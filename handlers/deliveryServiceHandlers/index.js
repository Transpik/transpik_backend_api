const configHandlers = require('./configs');
const verificationHandlers = require('./verification');
const changeStageHandlers = require('./orders');
const driversHandlers = require('./deliveryDriverServiceHandlers/drivers');

module.exports = {
    ...configHandlers,
    ...verificationHandlers,
    ...changeStageHandlers,
    ...driversHandlers,
};