const mongoose = require('mongoose');

const { apiKeySchema } = require('../models/ApiKey');
const { refreshTokenSchema } = require('./RefreshToken');

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
        type: String,
        unique: true
    },
    using_services: [mongoose.Types.ObjectId],
    //refreshTokens: [refreshTokenSchema]
    //apiKey: apiKeySchema,
    //config: [configSchema]
});



ecommerceUserSchema.methods.createCustomerAccount = async function() {
    try {
        const customer = await stripe.customers.create({
            email: this.email,
            name: this.name || null,
            discription: `Ecommerce User - ${this._id}`
        });
        this.customer_id = customer.id;
        await this.save();
        return customer;
    }catch(error) {
        return error;
    }
}   

ecommerceUserSchema.methods.updateCustomerAccount = async function () {

}

ecommerceUserSchema.methods.setCard = async function(card) {
    try {
        if(this.customer_id) throw new Error("customer doesn't exists");
        const card = await stripe.customers.createSource(this.customer_id, {
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
        return card;
    }catch(error) {
        return error;
    }
}

ecommerceUserSchema.methods.setDefaultCard = async function(card_id) {
    try{
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
    }catch(error) {
        return error;
    }
}

ecommerceUserSchema.methods.listAllCards = async function() {
    try {
        const cards = await stripe.customers.listSources(
            this.customer_id,
            {object: 'card'}
        );
        return cards;
    }catch(error) {
        return error;
    }
}

ecommerceUserSchema.methods.removeCard = async function(card_id) {
    try {
        const card = this.cards.id(card_id);
        const deleted = await stripe.customers.deleteSource(
            this.customer_id,
            card.card_id
        );
        return deleted;
    }catch(error) {
        return error;
    }
}

const EcommerceUser = mongoose.model('EcommerceUser', ecommerceUserSchema);

module.exports = EcommerceUser;