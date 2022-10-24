const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
    card_id: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = {cardSchema, Card};