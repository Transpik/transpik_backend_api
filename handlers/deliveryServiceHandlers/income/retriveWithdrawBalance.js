const DeliveryUser = require('../../../models/DeliveryUser');

async function retriveWithdrawBalance(request, response) {
    const user = request.user;
    try {
        const withdraw = user.earnings.withdraw;
        response.code(200).send({ data: { withdraw: withdraw }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveWithdrawBalance;