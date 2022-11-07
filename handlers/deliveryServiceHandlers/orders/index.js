const moveToDeliveringStageHandler = require('./moveToDeliveringStageHandler');
const moveToProcessingStageHandler = require('./moveToProcessingStageHandler');
const retriveOrdersHandler = require('./retriveOrdersHandler');
const retriveIncommmingOrdersHandler = require('./retriveIncommingOrderHandler');
const retriveProcessingOrdersHandler = require('./retriveProcessingOrderHandler');
const retriveDeliveringOrdersHandler = require('./retriveDeliveringOrderHandler');


module.exports = {
    moveToDeliveringStageHandler,
    moveToProcessingStageHandler,
    retriveOrdersHandler,
    retriveIncommmingOrdersHandler,
    retriveDeliveringOrdersHandler,
    retriveProcessingOrdersHandler,
}