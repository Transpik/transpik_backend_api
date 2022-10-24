const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    period: {
        type: Number, // in dates
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['ecommerce', 'delivery'],
    }
}, { timestamps: true });

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = {ApiKey, apiKeySchema};