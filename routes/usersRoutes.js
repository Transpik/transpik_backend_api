const usersCreateOpts = require('../options/usersCreateOpts');
const usersCreate = require('../handlers/usersCreate');


function usersRoutes(fastify, options, done) {
    fastify.post('/users', usersCreateOpts, usersCreate);

    done();
}

module.exports = usersRoutes;