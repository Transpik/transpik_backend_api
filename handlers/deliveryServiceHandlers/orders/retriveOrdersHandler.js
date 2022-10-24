const Order = require('../../../models/Order');

async function retriveOrdersHandler(request, response) {
    try {
        const orders = await Order.find({});
        response.code(200).send({ data: { orders: orders }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message});
    }
}

module.exports = retriveOrdersHandler;