const {
    addServicesOpts,
    ordersCreateOpts,
    removeServicesOpts,
    createServiceConfigOpts,
    removeServiceConfigOpts,
    updateServiceConfigOpts,
    createPaymentsOpts,
    updatePasswordOpts,
    updateAccountDetailsOpts,
} = require('../../options/ecommerceServiceOtions');

const {
    createOrderHandler,
    createServiceHandler,
    createServiceConfigHander,
    deleteServiceConfigHandler,
    updateServiceConfigHandler,
    retriveServiceConfigHandler,
    createPaymentHandler,
    deleteServiceHandler,
    retriveServiceHandler,
    updateAccountPasswordHandler,
    updateAccountDetailsHandler,
    listAvailableServiceHandler,
    listCompletedOrdersHander,
    listOngoingOrdersHandler,
} = require('../../handlers/ecommerceServiceHandlers');

function ecommerceServiceRoutes(fastify, options, done) {
    
    fastify.patch('/users/ecommerce_services/details', { ...updateAccountDetailsOpts
        ,preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, updateAccountDetailsHandler);

    fastify.get('/users/delivery_services/verified', { preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, listAvailableServiceHandler)

    fastify.patch('/users/security', { ...updatePasswordOpts
        ,preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, updateAccountPasswordHandler);

    // orders

    // create order
    fastify.post('/orders', {...ordersCreateOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    createOrderHandler);

    fastify.get('/orders/ongoing', {
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    listOngoingOrdersHandler);

    fastify.get('/orders/completed', {
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    listCompletedOrdersHander);
    
    // adding delivery services
    fastify.post('/services', {...addServicesOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    createServiceHandler);

    fastify.delete('/services', {...removeServicesOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    deleteServiceHandler);

    fastify.get('/services', {
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, retriveServiceHandler);

    // assign delivery services to handle packages
    fastify.post('/service_configurations', {...createServiceConfigOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    createServiceConfigHander);

    fastify.delete('/service_configurations', {...removeServiceConfigOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    deleteServiceConfigHandler);

    fastify.patch('/service_configurations', {...updateServiceConfigOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
        updateServiceConfigHandler);

    fastify.get('/service_configurations', {
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, retriveServiceConfigHandler);

    fastify.post('/payments', {...createPaymentsOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    createPaymentHandler);

    done();
}

module.exports = ecommerceServiceRoutes;