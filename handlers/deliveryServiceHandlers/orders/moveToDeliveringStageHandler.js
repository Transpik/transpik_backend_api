const Order = require('../../../models/Order');
const Driver = require('../../../models/Driver');


async function moveToDeliveringStageHandler(request, response) {
    const user = request.user;
    const { order_id, driver_id } = request.body;
    try {
        const order = await Order.findById(order_id);
        if(!order) throw new Error('Order not found');

        const driver = await Driver.findById(driver_id);
        if(!driver) throw new Error('Driver not found');

        if(order.order_status !== 'processing') throw new Error('Order cannot move to delivering stage');

        if(order.delivery_service_id != user._id) throw new Error('Invalid service id');

        order.moveToDeliveringStage();
        order.assigned_driver_id = driver._id;
        order.assigned_driver_name = driver.initials+driver.last_name;
        await order.save();
        response.code(200).send({ data: { order: order }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message })
    }
}

module.exports = moveToDeliveringStageHandler;