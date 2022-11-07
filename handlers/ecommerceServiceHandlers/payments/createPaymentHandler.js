const Order = require('../../../models/Order');
const SK_TEST = process.env.STRIPE_KEY;
const Payment = require('../../../models/Payment');
const DeliveryUser = require('../../../models/DeliveryUser');
const stripe = require('stripe')(SK_TEST);
const mongoose = require('mongoose');

async function createPaymentHandler(request, response) {
    const { order_id, card } = request.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const order = await Order.findById(order_id, null, { session }).exec();
        if(!order) throw new Error('order not exists');
        if(order.payment_status == 'paid') throw new Error('already paid order');
        const deliveryUser = await DeliveryUser.findById(order.delivery_service_id, null, { session });
        if(!deliveryUser) throw new Error('delivery user not exists');

        

        //if(order.expired_in <= Date.now()) throw new Error('order expired, please create a new order');
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              number: card.number,
              exp_month: card.exp_month,
              exp_year: card.exp_year,
              cvc: card.cvc,
            },
        });

        const payment = await Payment.create({
            order_id: order._id,
            payment_method_id: paymentMethod.id,
            payment_method: paymentMethod,
            fee: order.order_fee,
            is_refunded: false
        }, null, { session });

        
        order.payment_status = 'paid';
        order.payment_id = payment._id;
        deliveryUser.earnings.ongoing_balance += order.order_fee;
        await payment.makePayment();
        await payment.save();
        await deliveryUser.save();
        await order.save();
        await session.commitTransaction();
        response.code(200).send({ data: { payment: payment }, message: "payment success"});
    }catch(error) {
        await session.abortTransaction();
        response.code(400).send( { data: {}, message: error.message });
    }finally {
        session.endSession();
    }
}

module.exports = createPaymentHandler;
