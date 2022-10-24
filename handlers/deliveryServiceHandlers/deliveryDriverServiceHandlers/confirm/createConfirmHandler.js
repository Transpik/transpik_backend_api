const Confirm = require('../../../../models/Confirm');
const Order = require('../../../../models/Order');
const SK_TEST = require('../../../../utils/StripeKeys');
const stripe = require('stripe')(SK_TEST);
const  DeliveryUser = require('../../../../models/DeliveryUser');

async function createConfirmHandler(request, response) {
    const { order_id, nic_proof } = request.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const order = await Order.findById(order_id, { session });
        if(!order) throw new Error('order not exists');

        const deliveryUser = await DeliveryUser.findById(order.delivery_service_id, { session });
        if(!deliveryUser) throw new Error('delivery account not exists');

        const confirm = await Confirm.create({ order_id: order_id, nic_proof: nic_proof }, { session });
        const transfer = await stripe.transfers.create({
            amount: order.order_fee,
            currency: 'usd',
            destination: deliveryUser.account_id
        });
        order.order_status = 'complete';
        order.confirm_id = confirm._id;
        deliveryUser.earnings.ongoing_balance -= order.order_fee;
        deliveryUser.earnings.net_income += order.order_fee;
        await deliveryUser.save();
        await session.commitTransaction();
        response.code(201).send({ data: { confirm: confirm, transfer: transfer, order: order }, message: "confirm success"});
    }catch(error) {
       await  session.abortTransaction();
        response.code(400).send({ data: { }, message: error.message});
    }finally {
        session.endSession();
    }
}

module.exports = createConfirmHandler;