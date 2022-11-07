const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    postal_code: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    business_reg_no: {
        type: String,
        required: true
    },
    location: locationSchema,

    delivery_service_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    verified_status: {
        type: Boolean,
        default: false,
        required: true
    },
}, { timestamps: true });

verificationSchema.methods.verify = async function() {
    const verification = this;
    verification.verified_status = true;
    await verification.save();
    return verification;
}

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = { Verification, verificationSchema, locationSchema };