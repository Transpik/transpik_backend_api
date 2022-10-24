const DeliveryUser = require("../../../../models/DeliveryUser");

async function updateServiceConfigHandler(request, response) {
    const { service_config_id, config_id, service_id } = request.body;
    const user = request.user;
    try {
        const serviceConfig = user.service_configs.id(service_config_id);
        if(!serviceConfig) throw new Error('service configuration not exists');

        const deliveryUser = await DeliveryUser.findById(service_id).exec();
        if(!deliveryUser) throw new Error('delivery service not exists');

        const config = deliveryUser.charges_configurations.id(config_id);
        if(!config) throw new Error('charge configuration not exists');

        user.service_configs.service_id = deliveryUser._id;
        user.service_configs.config_id = config._id;
        await user.save();

        response.code(200).send({ data: { user: user }, message: "updated success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message })
    }
    
}

module.exports = updateServiceConfigHandler;