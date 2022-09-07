const { verifyHandler } = require('../../handlers/deliveryServiceHandlers');
const { verifyOpts } = require('../../options/deliveryServiceOptions');

function deliverServiceRoutes(fastify, options, done) {
    // public route
    fastify.post("/users/delivery_users/verify", verifyOpts, verifyHandler);

    done();
};


module.exports = deliverServiceRoutes;