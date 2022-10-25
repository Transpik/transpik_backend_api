const Order = require('../../../models/Order');


async function moveToProcessingStageHandler(request, response) {
    const user = request.user;
    const { order_id } = request.body;
    try {
        const order = await Order.findById(order_id);
        if(!order) throw new Error('Order not found');

        if(order.order_status !== 'incomming') throw new Error('Order cannot move to processing stage');

        if(order.delivery_service_id != user._id) throw new Error('Invalid service id');

        order.moveToProcessingStage();
        await order.save();
        response.code(200).send({ data: { order: order }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message })
    }
}

module.exports = moveToProcessingStageHandler;