const DeliveryUser = require('../../../models/DeliveryUser');
const EcommerceUser = require('../../../models/EcommerceUser');


async function retriveAccountHandler(request, response) {
    const { user_id } = request.params;
    try {
        const user = await DeliveryUser.findById(user_id);
        if(!user) user = await EcommerceUser.findById(user_id);
        if(!user) throw new Error('User not found');
        delete user["password"];
        response.code(200).send({ data: { user: user }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveAccountHandler;