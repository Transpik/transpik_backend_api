// users handlers
const userCreateHandler = require('./users/userCreateHandler');
const userLoginHandler = require('./users/userLoginHandler');
const listDeliveryAccountsHandler = require('./users/listDeliveryAccountsHandler');
const silentAuthHandler = require('./users/silentAuthHandler'); 

// cards handlers
const createCardHandler = require('./cards/createCardHandler');
const setDefaultCardHanlder = require('./cards/setDefaultCardHandler');
const removeCardHandler = require('./cards/removeCardHanlder');
const listCardHandler = require('./cards/listCardsHandler');
const retriveAccountHandler = require('./users/retriveAccountHandler');

module.exports = { 
    userCreateHandler, 
    userLoginHandler,
    createCardHandler,
    removeCardHandler,
    setDefaultCardHanlder,
    listCardHandler,
    listDeliveryAccountsHandler, 
    silentAuthHandler,
    retriveAccountHandler,
};