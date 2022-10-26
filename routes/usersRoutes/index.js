/**
 * @author rajitha kumara
 * @version 1.0
 */

/**
 * load handlers here
 */

// users handlers
const {
    userCreateHandler,
    userLoginHandler,
    createCardHandler,
    removeCardHandler,
    listCardHandler,
    setDefaultCardHanlder,
    listDeliveryAccountsHandler,
    silentAuthHandler,
    retriveAccountHandler,
    retriveOrderByIdHandler,
} = require('../../handlers/userHandlers');
const listCardsHandler = require('../../handlers/userHandlers/cards/listCardsHandler');

/**
 * load options here 
 * options contain schema definitions for
 * request body, response body (based on status)
 *
 */

const {
    userCreateOpts,
    userLoginOpts,
    createCardOpts,
    removeCardOpts,
    setDefaultCardOpts,
} = require('../../options/usersOptions');


/**
 * definition of the users route plugin
 */


function userRoutes(fastify, options, done) {
    // user create
    fastify.post('/users', userCreateOpts, userCreateHandler);
    
    // user login
    fastify.post('/users/login', userLoginOpts, userLoginHandler);

    fastify.post('/users/silent_auth', { 
        schema: {
            body: {
                type: 'object',
                properties: {
                    refreshToken: { type: 'string' }
                },
                required: ['refreshToken']
            }
        }
    } ,silentAuthHandler);

    fastify.get('/users', {preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
        retriveAccountHandler
    )

    // create card
    fastify.post('/cards', createCardOpts, createCardHandler);

    // list cards
    fastify.get('/cards', listCardHandler);

    // remove card
    fastify.delete('/cards', removeCardOpts, removeCardHandler);

    // set default card
    fastify.post('/cards/default', setDefaultCardOpts, setDefaultCardHanlder);


    // list delivery accounts
    fastify.get('/users/delivery_users', listDeliveryAccountsHandler);

    fastify.get('/orders/:order_id', retriveOrderByIdHandler);
    done();
}

module.exports = userRoutes;