const DeliveryUser = require('../../../../models/DeliveryUser');
const Verification = require('../../../../models/Verification');

async function listAvailableServiceHandler(request, response) {
    try {
        const verifiedServices = await DeliveryUser.find({ 'verification_data.verified_status': true });

        response.code(200).send( { data: { services: verifiedServices }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = listAvailableServiceHandler;