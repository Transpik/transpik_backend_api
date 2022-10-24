async function deleteServiceConfigHandler(request, response) {
    const { service_config_id } = request.body;
    const user = request.user;
    try {

        const serviceConfig = await user.service_configs.id(service_config_id);
        if(!serviceConfig) throw new Error('Service config not exits');
        serviceConfig.remove();
        await user.save();
        response.code(200).send({ data: { serviceConfigs: user.service_configs }, message: "remove success" })
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = deleteServiceConfigHandler;