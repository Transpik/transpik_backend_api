const {
    requestVerifyOpts,
    configChargesOpts,
    moveToDeliveringOpts,
    moveToProcessingOpts
} = require('../../options/deliveryServiceOptions');

const {
    updateChargeConfigHandler,
    listChargeConfigHandler,
    retriveChargeConfigHandler,
    createVerificationHandler,
    moveToDeliveringStageHandler,
    moveToProcessingStageHandler,
} = require('../../handlers/deliveryServiceHandlers');


function deliveryServiceRoutes(fastify, options, done) {
    
    fastify.post('/accounts/delivery_services/verify', {...requestVerifyOpts,
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, createVerificationHandler);

    fastify.patch('/charges/delivery_services', {...configChargesOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, updateChargeConfigHandler);

    fastify.get('/charges/delivery_services/:service_id/:config_id', { 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, retriveChargeConfigHandler);

    fastify.get('/charges/delivery_services/:service_id', { 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, listChargeConfigHandler);

    fastify.patch('/orders/stages/delivering', {...moveToDeliveringOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, moveToDeliveringStageHandler);

    fastify.patch('/orders/stages/processing', {...moveToProcessingOpts, 
        preHandler: fastify.auth([fastify.asyncAuthAccessToken])
    }, moveToProcessingStageHandler);

    done();
}

module.exports = deliveryServiceRoutes;