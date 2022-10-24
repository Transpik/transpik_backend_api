const DeliveryUser = require('../../../../models/DeliveryUser');
const EcommerceUser = require('../../../../models/EcommerceUser');
const mongoose = require('mongoose');

async function createServiceConfigHandler(request, response) {
    const user = request.user;
    const { delivery_service_id, config_id } = request.body;
    try {
        const deliveryUser = await DeliveryUser.findById(delivery_service_id).exec();
        if(!deliveryUser) throw new Error('Invalid delivery user id');

        const config = deliveryUser.charges_configurations.id(config_id);
        if(!config) throw new Error('Invalid configuration id');

        const serviceConfigs = await EcommerceUser.aggregate([
            { $match: { "_id": mongoose.Types.ObjectId(user._id), "service_configs.postal_code": Number(config.postal_code) }},
            { $unwind: "$service_configs" },
            { $match: {"service_configs.postal_code": Number(config.postal_code)} }
        ]).exec();

        if(serviceConfigs.length > 0) throw new Error('already contains a configuration for the city');
        
        user.service_configs.push({
            postal_code: config.postal_code,
            delivery_service_id: deliveryUser._id,
            config_id: config._id
        });
        await user.save();
        response.code(200).send({ data: { service_configurations: user.service_configs }, message: "service config success" });

    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = createServiceConfigHandler;