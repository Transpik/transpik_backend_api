// users options
const userCreateOpts = require('./users/userCreateOpts');
const userLoginOpts = require('./users/userLoginOpts');

// users card options
const createCardOpts = require('./cards/createCardOpts');
const setDefaultCardOpts = require('./cards/setDefaultCardOpts');
const removeCardOpts = require('./cards/removeCardOpts');


module.exports = {
    userCreateOpts,
    userLoginOpts,
    createCardOpts,
    removeCardOpts,
    setDefaultCardOpts,
}