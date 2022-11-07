const Payment = require("../../../models/Payment");
const Order = require("../../../models/Order");
const Refund = require("../../../models/Refund");
const mongoose = require("mongoose");
const SK_TEST = process.env.STRIPE_KEY;
const stripe = require("stripe")(SK_TEST);

async function createRefundHandler(request, response) {
    const { payment_id } = request.body;
    const session = await mongoose.startSession();
    // starting the transaction
    session.startTransaction();
    try {
        const payment = await Payment.findById(payment_id, null, { session }).exec();
        if(!payment) throw new Error('payment not exists');

        const order = await Order.findById(payment.order_id, null, { session }).exec();
        if(!order) throw new Error('order not exists');

        if(order.order_status === 'complete' || order.order_status === 'deliverying' || order.order_status === 'cancel' || payment.is_refunded) throw new Error('cannot make the refund'); // cancel mean order refunded already

        const refundInfo = await stripe.refunds.create({
            payment_intent: payment.payment_intent_id
        });

        const refund = await Refund.create({ order_id: order._id, payment_id: payment._id }, null, { session }).exec();
        payment.is_refunded = true;
        payment.refund = refundInfo;
        payment.refund_id = refund._id;
        order.order_status = 'cancel';
        await order.save();
        await payment.save();

        await session.commitTransaction();
        response.code(200).send({ data: { order: order, payment: payment, refund: refund }, message: "refund success"});
    }catch(error) {
        session.abortTransaction();
        response.code(400).send({ data: {}, message: error.message });
    }finally {
        session.endSession();
    }
}

module.exports = createRefundHandler;