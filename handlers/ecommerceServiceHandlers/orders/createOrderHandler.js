const EcommerceUser = require('../../../models/EcommerceUser');
const Order = require('../../../models/Order');
const DeliveryUser = require('../../../models/DeliveryUser');
const mongoose = require('mongoose');

async function createOrderHandler(request, response) {
    
    const { pickup_location, delivery_location, package_options, delivery_method } = request.body;
    const user = request.user;
    try {
        // calculate the order fee and estimated delivery date
        const postalCode = delivery_location.postal_code;
        const configs = await EcommerceUser.aggregate([
            { $match: { "_id": mongoose.Types.ObjectId(user._id), "service_configs.postal_code": Number(postalCode) }},
            { $unwind: "$service_configs" },
            { $match: {"service_configs.postal_code": Number(postalCode)} }
        ]).exec();

        /*if(serviceConfigs.length === 0 || !serviceConfigs[0].availability) throw new Error("deliverying isn't available");*/

        if(configs.length === 0) throw new Error("deliverying isn't available");
        const serviceConfigs = configs[0].service_configs;
        //response.send({ ...serviceConfigs }); return;

        const delivery_user = await DeliveryUser.findById(serviceConfigs.delivery_service_id);
        
        const config = delivery_user.charges_configurations.id(serviceConfigs.config_id);
        //response.send({ config}); return;

        const fee = config.fee;
        const estimated_time = Date.now()+86400*7; // set for normal, need to fix
        const order = new Order({
            pickup_location: pickup_location,
            delivery_location: delivery_location,
            order_fee: fee,
            estimated_time: estimated_time,
            delivery_service_id: serviceConfigs.delivery_service_id,
            ecommerce_service_id: user._id,
            delivery_service_name: delivery_user.verification_data.business_name
        });
        await order.save();
        response.code(200).send({ data: { order: order }, message: 'order created success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }

}

module.exports = createOrderHandler;