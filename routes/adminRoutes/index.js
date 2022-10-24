const verifyServiceOpts = require('../../options/adminOptions/verifyServiceOpts');
const verifyServiceHandler = require('../../handlers/adminHandlers/verifyServiceHandler');

function adminRoutes(fastify, options, done) {
    fastify.patch('/users/admin/verify', verifyServiceOpts, verifyServiceHandler);
    done();
}

module.exports = adminRoutes;