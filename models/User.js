const mongoose = require('mongoose');

const cityFeesSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    fee: {
        type: mongoose.Types.Decimal128,
        required: true
    }
})

const deliveryChargeSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    cityFees: {
        type: [cityFeesSchema],
        required: true
    }
})

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['ecommerce', 'delivery'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    account_id: {
        type: 'String',
        unique: true
    },
    apiKey: {
        type: String
    },
    config: {
        delivery_charges: {
            country: {
                type: String,
            },
            countryCode: {
                type: String,
            },
            cityFees: {
                type: [{
                    city: {
                        type: String,
                    },
                    postalCode: {
                        type: String,
                    },
                    fee: {
                        type: mongoose.Types.Decimal128,
                    },
                }],
            }
        },
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;