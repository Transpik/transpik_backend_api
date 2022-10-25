const createOrderHandler = require('./createOrderHandler');
const listCompletedOrdersHander = require('./listCompletedOrdersHandler');
const listOngoingOrdersHandler = require('./listOngoingOrdersHandler');

module.exports = { 
    createOrderHandler, 
    listCompletedOrdersHander, 
    listOngoingOrdersHandler 
};