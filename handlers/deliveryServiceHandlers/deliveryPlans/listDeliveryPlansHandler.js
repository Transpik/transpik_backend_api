const DeliveryUser = require('../../../models/DeliveryUser');

async function listDeliveryPlansHandler(request, response) {
    try {
        const deliveringPlans = await DeliveryUser.listAvailablePlans();
        response.code(200).send({ data: { delivering_plans: deliveringPlans }, message: "success" });
    }catch(error) {
        response.code(400).send({ data: {} , message: error.message });
    }
    
}

module.exports = listDeliveryPlansHandler;