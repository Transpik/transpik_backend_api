const {
    addServicesOpts,
    ordersCreateOpts,
    removeServicesOpts,
    createServiceConfigOpts,
    removeServiceConfigOpts,
    updateServiceConfigOpts,
    createPaymentsOpts,
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
} = require('../../handlers/ecommerceServiceHandlers');

function ecommerceServiceRoutes(fastify, options, done) {
    
    // orders

    // create order
    fastify.post('/orders', {...ordersCreateOpts
        , preHandler: fastify.auth([fastify.asyncAuthAccessToken])}, 
    createOrderHandler);
    
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