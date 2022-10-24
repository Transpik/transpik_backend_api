const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    aud: {
        type: String,
        enum: ['ecommerce', 'delivery'],
    },
    sub: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    iss: {
        type: String,
        required: true
    }
}, { timestamps: true });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = { refreshTokenSchema, RefreshToken };