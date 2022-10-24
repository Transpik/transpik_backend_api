const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    payment_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });


const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;