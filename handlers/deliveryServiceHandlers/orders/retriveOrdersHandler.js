const Order = require('../../../models/Order');

async function retriveOrdersHandler(request, response) {
    const user = request.user;
    try {
        const orders = await Order.find({ delivery_service_id:user._id });
        response.code(200).send({ data: { orders: orders }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message});
    }
}

module.exports = retriveOrdersHandler;