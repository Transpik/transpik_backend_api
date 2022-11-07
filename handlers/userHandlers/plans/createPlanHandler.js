const SK_TEST = process.env.STRIPE_KEY;
const stripe = require('stripe')(SK_TEST);

async function createPlanHandler(request, response) {
    const { price_id, success_url, cancel_url } = request.body;

    const session = await stripe.checkout.sessions.create({
        success_url: success_url,
        cancel_url: cancel_url,
        line_items: [
          {price: price_id, quantity: 1},
        ],
        mode: 'payment',
    });

    // for testing
    // generate the API key and assign

    response.redirect(303, session.url);
}

module.exports = createPlanHandler;