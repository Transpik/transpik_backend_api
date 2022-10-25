const mongoose = require('mongoose');

const { locationSchema } = require('../models/Verification');

const progressEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    message: {
        type: String,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    ecommerce_service_id: {
        type: String,
        required: true
    },
    delivery_service_id: {
        type: String,
        required: true
    },
    delivery_service_name: {
        type: String,
        required: true
    },
    assigned_driver_id: {
        type: mongoose.Types.ObjectId
    },
    assigned_driver_name: {
        type: String
    },
    /*delivery_method: {
        type: String,
        enum: ['express', 'normal', 'oneday'],
        default: 'normal',
        required: true,
    },*/
    /* package_options: {
        any: Object,
        fragile: { type: Boolean },
        foods: { type: Boolean },
        care: { type: Boolean },
        normal: { type: Boolean },
    },*/
    pickup_location: locationSchema,
    delivery_location: locationSchema,
    order_fee: { type: mongoose.Types.Decimal128, required: true },
    /*order_fee_details: {
        any: Object,
        packaging_fee: { type: mongoose.Types.Decimal128, required: true },
        delivery_method_fee: { type: mongoose.Types.Decimal128, required: true },
        delivery_fee: { type: mongoose.Types.Decimal128, required: true },
    },*/
    payment_status: {
        type: String,
        enum: ['paid', 'unpaid', 'refunded'],
        default: 'unpaid',
        required: true
    },
    order_status: {
        type: String,
        enum: ['cancel', 'complete', 'incomming', 'processing', 'delivering'],
        required: true,
        default: 'incomming'
    },
    progress: [progressEntrySchema],
    estimated_time: {
        type: Date,
        required: true
    },
    expired_in : {
        type: Date,
        required: true,
        default: Date.now()+86400
    },
    payment_id: mongoose.Types.ObjectId,
    confirm_id: mongoose.Types.ObjectId 
}, { timestamps: true });


orderSchema.methods.moveToProcessingStage = async function moveToProcessingStage() {
    try {
        this.order_status = 'processing';
        this.progress.push({message: "collecting goods from warehouse"});
    }catch(error) {
        return error;
    }
}

orderSchema.methods.moveToDeliveringStage = async function moveToDeliveringStage() {
    try {
        this.order_status = 'delivering'; // need to modify
        this.progress.push({message:"order is delivering"});
    }catch(error) {
        return error;
    }
}

orderSchema.methods.cancel = async function cancel() {
    try {
        this.order_status = 'cancel'; // need to implement the logic
        this.progress.push("order cancel");
        await this.save();
        return this;
    }catch(error) {
        return error;
    }
}
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;