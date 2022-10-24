const mongoose = require('mongoose');

const { apiKeySchema } = require('../models/ApiKey');
const { verificationSchema } = require('../models/Verification');
const { Card, cardSchema } = require('./Card');

const SK_TEST = require('../utils/StripeKeys');
const stripe = require('stripe')(SK_TEST);
const apikeygen = require('generate-api-key');

const cityFeesSchema = new mongoose.Schema({
    postal_code: {
        type: String,
        required: true,
        unique: true
    },
    availability: {
        type: Boolean,
        default: false,
        required: true
    },
    fee: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    city: {
        type: String,
        //required: true
    }
});

const deliveryChargeSchema = new mongoose.Schema({
    country_code: {
        type: String,
        required: true,
        unique: true
    },
    city_fees: {
        type: [cityFeesSchema],
        required: true
    }
});

const earningsSchema = new mongoose.Schema({
    net_income: {
      type: mongoose.Types.Decimal128,
      required: true,
      default: 0.00
    },
    withdraw: {
      type: mongoose.Types.Decimal128,
      required: true,
      default: 0.00
    },
    ongoing_balance: {
      type: mongoose.Types.Decimal128,
      required: true,
      default: 0.00
    }
});

const subscriptionSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    api_key: apiKeySchema,
}, { timestamps: true });

const deliveryUserSchema = new mongoose.Schema({
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
        enum: 'delivery',
        required: true,
        default: 'delivery'
    },
    account_id: {
        type: String
    },
    customer_id: {
        type: String
    },
    charges_configurations: [cityFeesSchema],
    cards: [cardSchema],
    earnings: earningsSchema,

    verification_data: verificationSchema,
    subscription: subscriptionSchema,
    apikey: { type: String },
    refreshTokens: [String]
});

// update password
// generate a new api key =>
// update api key =>
// config methods charges
// config packing charges
// config delivery charges

// billing and marketplace
// get current plan
// get available plans => done
// purchase a plan => done
// disable and enable subscription

// set, update, delete, get cards => done
// set checkout

deliveryUserSchema.methods.createCustomerAccount = async function() {
    try {
        const customer = await stripe.customers.create({
            email: this.email,
            address: this.verificationData.location.address || null,
            name: this.verificationData.businessName,
            discription: `Delivery User - ${this._id}`
        });
        this.customer_id = customer.id;
        await this.save();
        return customer;
    }catch(error) {
        return error;
    }
}

deliveryUserSchema.methods.updateCustomerAccount = async function () {

}

deliveryUserSchema.methods.setCard = async function(card) {
    try {
        if(this.customer_id) throw new Error("customer doesn't exists");
        const cardInfo = await stripe.customers.createSource(this.customer_id, {
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
        const card = new Card({ user_id: this._id, card_id: cardInfo._id});
        this.cards.push(card);
        await this.save();
        return card;
    }catch(error) {
        return error;
    }
}

deliveryUserSchema.methods.setDefaultCard = async function(card_id) {
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

deliveryUserSchema.methods.listAllCards = async function() {
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

deliveryUserSchema.methods.removeCard = async function(card_id) {
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

deliveryUserSchema.methods.createCheckout = async function(product_id) {
    try {
        const product = await stripe.products.retrieve(
            product_id
        );
        const session = await stripe.checkout.sessions.create({
            success_url: 'https:localhost:3001/success',
            cancel_url: 'https:localhost:3001/cancel',
            line_items: [
              {price: product.id, quantity: 1},
            ],
            customer: this.customer_id,
            customer_email: this.email,
            mode: 'subscription',
        });
        return session;
    }catch(error) {
        return error;
    }
}

deliveryUserSchema.methods.generateNewApiKey = async function() {
    try {
        const key = generateApiKey({
            method: 'uuidv5',
            name: 'production app',
            namespace: '596ac0ae-c4a0-4803-b796-8f239c8431ba',
            dashes: false
        });
        this.apikey = key;
        await this.save();
        return apikey;
    }catch(error) {
        return error;
    }
}

deliveryUserSchema.methods.createConnectedAccount = async function() {
    try {
        if(!this.verificationData.verificationStatus) throw new Error('Account not verified');
        const account = await stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: this.email,
            capabilities: {
              card_payments: {requested: true},
              transfers: {requested: true},
            },
          });
          this.account_id = account.id;
    }catch(error) {
        return error;
    }
}

deliveryUserSchema.statics.listAvailablePlans = async function() {
    try {
        const products = await stripe.products.list();
        const deliveringPlans = products.data.filter(product => product.metadata.type === 'delivery');
        return deliveringPlans;
    }catch(error) {
        return error;
    }
}


const DeliveryUser = mongoose.model('DeliveryUser', deliveryUserSchema);
module.exports = DeliveryUser;
