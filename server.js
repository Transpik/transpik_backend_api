const fastify = require('fastify')({
    logger: true
});
const mongoose = require('mongoose');

fastify.register(require('./routes/usersRoutes'));


async function start() {
    try {
        await fastify.listen({ port: "8080", host: "localhost" });
        await mongoose.connect('mongodb://localhost:27017/tp_db');
    }catch(err) {
        console.error(err);
        process.exit(1);
    }
}

start();