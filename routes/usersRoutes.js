// load options
const usersCreateOpts = require('../options/usersCreateOpts');
const { 
    usersGetByTypeOpts, 
    userGetByTypeAndIdOpts, 
    userGetByIdOpts 
} = require('../options/usersGetOpts');


// load handlers
const usersCreate = require('../handlers/usersCreate');
const { 
    usersGetByType,
    userGetByTypeAndId,
    userGetById
} = require('../handlers/usersGet');

function usersRoutes(fastify, options, done) {
    fastify.post('/users', usersCreateOpts, usersCreate); // signup user

    /*fastify.get('/users/:type', usersGetByTypeOpts , usersGetByType);
    fastify.get('/users/:type/:id', userGetByTypeAndIdOpts, userGetByTypeAndId);
    fastify.get('/users/:id', userGetByIdOpts, userGetById);*/
    done();
}

module.exports = usersRoutes;