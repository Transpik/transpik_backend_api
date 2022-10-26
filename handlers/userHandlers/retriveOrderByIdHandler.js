const Order = require('../../models/Order');

async function retriveOrderByIdHandler(request, response) {
    const { order_id } = request.params; 
    try {
        const order = await Order.find({ order_id: order_id });

        response.code(200).send({ data: { order: order }, message: 'success' });
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveOrderByIdHandler;