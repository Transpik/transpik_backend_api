const {
    requestVerifyOpts,
    configChargesOpts,
    moveToDeliveringOpts,
    moveToProcessingOpts,
    createDeliveryDriverOpts
} = require('../../options/deliveryServiceOptions');

const {
    updateChargeConfigHandler,
    listChargeConfigHandler,
    retriveChargeConfigHandler,
    createVerificationHandler,
    moveToDeliveringStageHandler,
    moveToProcessingStageHandler,
    retriveOrdersHandler,
    retriveIncommmingOrdersHandler,
    retriveProcessingOrdersHandler,
    createDriverAccountHandler,
    listDriverHandler,
    retriveDeliveringOrdersHandler,
} = require('../../handlers/deliveryServiceHandlers');


function deliveryServiceRoutes(fastify, options, done) {
    
    fastify.post('/users/delivery_services/verify', {...requestVerifyOpts,
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, createVerificationHandler);

    fastify.patch('/charges/delivery_services', {...configChargesOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, updateChargeConfigHandler);

    fastify.get('/charges/delivery_services/:service_id/:config_id', { 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, retriveChargeConfigHandler);

    fastify.get('/charges/delivery_services', { 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, listChargeConfigHandler);

    fastify.get('/orders', { preHandler: fastify.auth([fastify.asyncAuthAccessToken]) }
    ,retriveOrdersHandler)

    fastify.get('/orders/incomming', { preHandler: fastify.auth([fastify.asyncAuthAccessToken]) }
    ,retriveIncommmingOrdersHandler)

    fastify.get('/orders/processing', { preHandler: fastify.auth([fastify.asyncAuthAccessToken]) }
    ,retriveProcessingOrdersHandler)

    fastify.get('/orders/delivering', { preHandler: fastify.auth([fastify.asyncAuthAccessToken]) }
    ,retriveDeliveringOrdersHandler)

    fastify.patch('/orders/stages/delivering', {...moveToDeliveringOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, moveToDeliveringStageHandler);

    fastify.patch('/orders/stages/processing', {...moveToProcessingOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, moveToProcessingStageHandler);

    // drivers
    fastify.post('/users/delivery_services/drivers', {...createDeliveryDriverOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, createDriverAccountHandler);

    fastify.get('/users/delivery_services/drivers', { 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, listDriverHandler);

    done();
}

module.exports = deliveryServiceRoutes;