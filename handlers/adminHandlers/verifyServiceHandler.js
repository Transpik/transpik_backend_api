const { Verification } = require('../../models/Verification');
const DeliveryUser = require('../../models/DeliveryUser');
const SK_TEST = require('../../utils/StripeKeys');
const loadPostalCodes = require('../../utils/loadPostalCodes');

const stripe = require('stripe')(SK_TEST);

async function verifyServiceHandler(request, response) {
    const { verification_id } = request.body;
    try {
        const verification = await Verification.findById(verification_id);
        if(!verification) throw new Error('verification request not exists');
        // need to refactor
        const user = await DeliveryUser.findById(verification.delivery_service_id);
        if(!user) throw new Error('invalid verification request');
        //if(user.verificationData.verifiedStatus) throw new Error('user already verified');

        if(!user.account_id) {
            const account = await stripe.accounts.create({
                type: 'custom',
                country: verification.location.country_code, // US
                email: user.email,
                business_type: 'company',
                company: {
                    /*address: {
                        line1: verification.location.address,
                        city: verification.location.city,
                        country: verification.location.countryCode,
                        state: verification.location.state,
                        postal_code: verification.location.postalCode
                    },*/
                    name: verification.business_name,
                    registration_number: verification.business_reg_no,
                },
                capabilities: {
                card_payments: {requested: true},
                transfers: {requested: true},
                },
            });
            user.account_id = account.id;
        }else {
            // update the account
        }
        // based on the user country
        // we only support lk only yet

        const postalCodes = loadPostalCodes();
        postalCodes.forEach(entry => {
            user.charges_configurations.push({ postal_code: entry.code , availability: false, city: entry.city });
        });

        user.verificationData = await verification.verify();
        await user.save();
        response.code(200).send({ data: { user: user }, message: "verification success"});

    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = verifyServiceHandler;