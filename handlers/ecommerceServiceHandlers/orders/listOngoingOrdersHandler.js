const Order = require('../../../models/Order');

async function listOngoingOrdersHandler(request, response) {
    const user = request.user;
    try {
        const orders = await Order.find({ ecommerce_service_id: user._id, 'order_status': { $nin: ['complete', 'cancel'] }})

        response.code(200).send({ data: { orders: orders }, message: 'success' });
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = listOngoingOrdersHandler;