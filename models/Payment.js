const SK_TEST = require('../utils/StripeKeys');
const stripe = require('stripe')(SK_TEST);
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_intent_id: {
        type: String,
        unique: true
    },
    payment_method_id: {
        type: String,
        unique: true,
        required: true
    },
    order_id: {
        type: mongoose.Types.ObjectId,
        unique: true,
        required: true
    },
    fee: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    is_refunded: {
        type: Boolean,
        required: true,
        default: false
    },
    refund_id: {
        type: mongoose.Types.ObjectId,
        unique: true
    },
    payment_intent: { type: mongoose.Schema.Types.Mixed },
    payment_method: { type: mongoose.Schema.Types.Mixed},
    refund: { type: mongoose.Schema.Types.Mixed}

}, { timestamps: true });

paymentSchema.methods.makePayment = async function() {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: this.fee,
            currency: 'usd',
            payment_method_types: ['card'],
            confirm: true,
            payment_method: this.payment_method_id
        });
        this.payment_intent_id = paymentIntent._id;
        this.payment_intent = paymentIntent;
        await this.save();
        return this;
    }catch(error) {
        return error;
    }
}

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;