const DeliveryUser = require('../../../models/DeliveryUser');

async function retriveNetIncomeHandler(request, response) {
    const user = request.user;
    try {
        const net_income = user.earnings.net_income;
        response.code(200).send({ data: { net_income: net_income }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveNetIncomeHandler;