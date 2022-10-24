async function retriveServiceConfigHandler(request, response) {
    const user = request.user;
    try {
        const sericeConfigs = user.serice_configs;
        response.code(200).send({ data: { service_configurations: sericeConfigs }, message: "success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveServiceConfigHandler;