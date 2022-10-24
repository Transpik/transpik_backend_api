const mongoose = require('mongoose');

const confirmSchema = new mongoose.Schema({
    order_id: { 
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    nic_proof: {
        type: String,
        required: true
    },
    delivered_at: {
        type: Date,
        default: Date.now(),
        required: true
    },
    // need to add driver details
});

const Confirm = mongoose.model('Confirm', confirmSchema);
module.exports = Confirm;