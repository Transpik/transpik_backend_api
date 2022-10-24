const DeliveryUser = require('../../../models/DeliveryUser');

async function retriveOngoingBalance(request, response) {
    const user = request.user;
    try {
        const ongoing_balance = user.earnings.ongoing_balance;
        response.code(200).send({ data: { ongoing_balance: ongoing_balance }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveOngoingBalance;