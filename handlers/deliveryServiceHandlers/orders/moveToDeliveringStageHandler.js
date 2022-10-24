const Order = require('../../../models/Order');


async function moveToDeliveringStageHandler(request, response) {
    const user = request.user;
    const { order_id } = request.body;
    try {
        const order = await Order.findById(order_id);
        if(!order) throw new Error('Order not found');

        if(order.status !== 'processing') throw new Error('Order cannot move to delivering stage');

        if(order.delivery_service_id != user._id) throw new Error('Invalid service id');

        const updatedOrder = order.moveToDeliveringStage();
        response.code(200).send({ data: { order: updatedOrder }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message })
    }
}

module.exports = moveToDeliveringStageHandler;