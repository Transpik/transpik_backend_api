function ecommerceServiceRoutes(fastify, options, done) {
    
    fastify.get("/accounts/ecommerce_services"); // get all ecommerce services
    fastify.patch("/accounts/ecommerce_services/:id") // update the profile details
    fastify.get("/accounts/ecommerce_services/:id/api_keys") // get the current api key
    fastify.post("/accounts/ecommerce_services/:id/api_keys") // create new api_key
    fastify.patch("/accounts/ecommerce_services/:id/api_keys") // update the api_key

    fastify.post("/accounts/ecommerce_services/:id/configuratons/services/add") // add deliver service
    fastify.patch("/accounts/ecommerce_services/:id/configurations/services/remove") // remove delivery service
    fastify.post("/accounts/ecommerce_services/:id/configurations/system/assign") // set states
    
    done();
} 