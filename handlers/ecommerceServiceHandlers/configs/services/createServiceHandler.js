const DeliveryUser = require("../../../../models/DeliveryUser");

async function createServiceHandler(request, response) {
    const user = request.user;
    const { delivery_service_id } = request.body;
    try {
        const usingServices = user.using_services;
        const deliveryUser = await DeliveryUser.findById(delivery_service_id).exec();
        if(!deliveryUser) throw new Error('service not exists');

        if(usingServices.indexOf(delivery_service_id) >= 0) throw new Error('already add service');

        user.using_services.push(delivery_service_id);
        await user.save();
        response.code(201).send({ data: { using_services: user.using_services }, message: 'service add success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = createServiceHandler;