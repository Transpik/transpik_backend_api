const fastify = require('fastify')({
    logger: true
});



fastify.listen({port: 3000, host: 'localhost'}, (err, address) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    // when server is up and running perfectly
    console.log(`Server is up and running at ${address}`);
})