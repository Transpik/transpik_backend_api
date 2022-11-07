const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    initials: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    serving_city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    service_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;