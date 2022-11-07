const mongoose = require('mongoose');

const { apiKeySchema } = require('../models/ApiKey');
const { refreshTokenSchema } = require('./RefreshToken');
const { verificationSchema } = require('../models/Verification');
const { Card, cardSchema } = require('./Card');

const SK_TEST = process.env.STRIPE_KEY;
const stripe = require('stripe')(SK_TEST);

const cityFeesSchema = new mongoose.Schema({
    postal_code: {
        type: String,
        required: true,
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
    service_users: [mongoose.Types.ObjectId],
    //refreshTokens: [refreshTokenSchema]
});

deliveryUserSchema.methods.createCustomerAccount = async function createCustomerAccount() {
    const customer = await stripe.customers.create({
        email: this.email,
        description: `Delivery User - ${this._id}`
    });
    this.customer_id = customer.id;
}

deliveryUserSchema.methods.updateCustomerAccount = async function updateCustomerAccount() {

}

deliveryUserSchema.methods.setCard = async function(card) {
    if(!this.customer_id) throw new Error("customer doesn't exists");
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
    const createdCard = new Card({ user_id: this._id, card_id: cardInfo._id});
    this.cards.push(createdCard);
    return createdCard;
}

deliveryUserSchema.methods.setDefaultCard = async function setDefaultCard(card_id) {
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

deliveryUserSchema.methods.listAllCards = async function listAllCards() {
    const cards = await stripe.customers.listSources(
        this.customer_id,
        {object: 'card'}
    );
    return cards;
}

deliveryUserSchema.methods.removeCard = async function removeCard(card_id) {
    const card = this.cards.id(card_id);
    const deleted = await stripe.customers.deleteSource(
        this.customer_id,
        card.card_id
    );
    return deleted;
}

deliveryUserSchema.methods.createCheckout = async function createCheckout(product_id) {
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
}

deliveryUserSchema.methods.generateNewApiKey = async function generateNewApiKey() {
    const key = generateApiKey({
        method: 'uuidv5',
        name: 'production app',
        namespace: '596ac0ae-c4a0-4803-b796-8f239c8431ba',
        dashes: false
    });
    this.apikey = key;
    await this.save();
    return apikey;
}

deliveryUserSchema.methods.createConnectedAccount = async function createConnectedAccount() {
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
}

deliveryUserSchema.statics.listAvailablePlans = async function listAvailablePlans() {
    const products = await stripe.products.list();
    const deliveringPlans = products.data.filter(product => product.metadata.type === 'delivery');
    return deliveringPlans;
}


const DeliveryUser = mongoose.model('DeliveryUser', deliveryUserSchema);
module.exports = DeliveryUser;
