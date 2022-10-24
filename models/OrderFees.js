const mongoose = require('mongoose');

const orderFeesSchema = new mongoose.Schema({
    delivery_method: {
        type: String,
        enum: ['express', 'normal', 'oneday'],
        default: 'normal',
        required: true,
    },
    package_options: {
        any: Object,
        fragile: { type: Boolean },
        foods: { type: Boolean },
        care: { type: Boolean },
        normal: { type: Boolean },
    },
    pickup_loaction: {
        any: Object,
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true },
    },
    delivery_location: {
        any: Object,
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true },
    },
    order_fee: { type: mongoose.Types.Decimal128, required: true },
    order_fee_details: {
        any: Object,
        packaging_fee: { type: mongoose.Types.Decimal128, required: true },
        delivery_method_fee: { type: mongoose.Types.Decimal128, required: true },
        delivery_fee: { type: mongoose.Types.Decimal128, required: true },
    },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at'});

const OrdersFees = mongoose.model('OrderFees', orderFeesSchema);

module.exports = OrdersFees;