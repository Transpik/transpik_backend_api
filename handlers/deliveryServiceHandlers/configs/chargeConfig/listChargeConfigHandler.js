const DeliveryUser = require('../../../../models/DeliveryUser');

// available for both ecommerce and delivery
async function listChargeConfigHandler(request, response) {
    const user = request.user;
    const { service_id } = request.params;
    try {
        if(!service_id) service_id = user._id;
        const deliveryUser = await DeliveryUser.findById(service_id).exec();
        if(!deliveryUser) throw new Error('delivery user not exists');
        const chargeConfigs = deliveryUser.charges_configurations;
        if(!chargeConfigs) throw new Error('charge configuration not exists');
        response.code(200).send({ data: { charge_configurations: chargeConfigs }, message: "success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = listChargeConfigHandler;