const serviceConfigHandlers = require('./configs/serviceConfig');
const serviceHandlers = require('./configs/services');
const refundHandlers = require('./refunds');
const orderHandlers = require('./orders');
const paymentHandlers = require('./payments');
const accountHandlers = require('./account');


module.exports = { 
    ...serviceConfigHandlers,
    ...serviceHandlers,
    ...refundHandlers,
    ...orderHandlers,
    ...paymentHandlers,
    ...accountHandlers,
};