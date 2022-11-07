const mongoose = require('mongoose');

const { apiKeySchema } = require('../models/ApiKey');
const { refreshTokenSchema } = require('./RefreshToken');
const SK_TEST = process.env.STRIPE_KEY;
const stripe = require('stripe')(SK_TEST);

const serviceConfigSchema = new mongoose.Schema({
    service_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    assign_cities: [mongoose.Types.ObjectId]
});


const cityConfigSchema = new mongoose.Schema({
    postal_code: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    handler: mongoose.Types.ObjectId
});

const configSchema = new mongoose.Schema({
    country_code: {
        type: String,
        required: true,
        unique: true
    },
    city_configs: [cityConfigSchema]
});

const ecommerceUserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: 'ecommerce',
        required: true,
        default: 'ecommerce'
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    service_configs: [{
        postal_code: {
            type: Number,
            required: true,
            unique: true
        },
        delivery_service_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        config_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            unique: true
        }
    }],
    customer_id: {
        type: String
    },
    using_services: [mongoose.Types.ObjectId],
    //refreshTokens: [refreshTokenSchema]
    //apiKey: apiKeySchema,
    //config: [configSchema]
});



ecommerceUserSchema.methods.createCustomerAccount = async function createCustomerAccount() {
    const customer = await stripe.customers.create({
        email: this.email,
        description: `Delivery User - ${this._id}`
    });
    this.customer_id = customer.id;
}   

ecommerceUserSchema.methods.updateCustomerAccount = async function updateCustomerAccount() {

}

ecommerceUserSchema.methods.setCard = async function setCard(card) {
    if(this.customer_id) throw new Error("customer doesn't exists");
    const createdCard = await stripe.customers.createSource(this.customer_id, {
        source: {
            object: 'card',
            number: card.number,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            cvc: card.cvc,
            name: card.name,
            address_line1: card.address
        }
    });
    return createdCard;
}

ecommerceUserSchema.methods.setDefaultCard = async function setDefaultCard(card_id) {
    const card = await stripe.customers.retrieveSource(
        this.customer_id,
        card_id
    );
    const customer = await stripe.customers.update(
        this.customer_id,
        {
            default_source: card.id
        }
        );
    return customer;
}

ecommerceUserSchema.methods.listAllCards = async function listAllCards() {
    const cards = await stripe.customers.listSources(
        this.customer_id,
        {object: 'card'}
    );
    return cards;
}

ecommerceUserSchema.methods.removeCard = async function removeCard(card_id) {
    const card = this.cards.id(card_id);
    const deleted = await stripe.customers.deleteSource(
        this.customer_id,
        card.card_id
    );
    return deleted;
}

const EcommerceUser = mongoose.model('EcommerceUser', ecommerceUserSchema);

module.exports = EcommerceUser;