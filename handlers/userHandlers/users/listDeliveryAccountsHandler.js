const DeliveryUser = require('../../../models/DeliveryUser');

async function listDeliveryAccountsHandler(request, response) {
    try {
        const delivery_users = await DeliveryUser.find({});
        response.code(200).send({ data: { delivery_users: delivery_users}, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message});
    }
}

module.exports = listDeliveryAccountsHandler;