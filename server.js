/**
 * @author rajitha kumara
 * @version 1.0
 * 
 */

// load environment variables
require('dotenv').config();

// load fastify
const fastify = require('fastify')({
    logger: true
});

const cors = require('@fastify/cors')

fastify.register(cors, { 
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Origin',
        'X-Requested-With',
        'Accept',
        'Access-Token'
    ],
    credentials: true,
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE']
})


fastify.register(require('@fastify/cookie'), {
    hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}  // options for parsing cookies
})

const mongoose = require('mongoose'); 

// load util procedures
const asyncAuthAccessToken = require('./utils/asyncAuthAccessToken');

// decorate the body to contain user property => optimized
fastify.decorateRequest('user', null);

// decorate preHandling procedures
fastify.decorate('asyncAuthAccessToken', asyncAuthAccessToken);

// register auth plugin
fastify.register(require('@fastify/auth'));

// start plugin registering
fastify.register(require('./routes/usersRoutes'));

fastify.register(require('./routes/deliveryServiceRoutes'));

fastify.register(require('./routes/adminRoutes'));

fastify.register(require('./routes/ecommerceServiceRoutes'));


// initializing server instance
async function start() {
    try {
        await fastify.listen({ port: process.env.PORT, host: process.env.HOST });
        await mongoose.connect(process.env.DB_STRING);
    }catch(err) {
        console.error(err);
        console.log('error from fastify'+err.message);
        process.exit(1);
    }
}

start();