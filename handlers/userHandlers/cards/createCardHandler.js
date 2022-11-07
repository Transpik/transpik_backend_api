const DeliveryUser = require("../../../models/DeliveryUser");

async function createCardHandler(request, response) {
    const user = request.user;
    const { card } = request.body;
    try {
        !user.customer_id ? await user.createCustomerAccount() : user.customer_id;
        
        const createdCard = await user.setCard(card);
        await user.save();
        response.code(200).send({ data: { card: createdCard }, message: "card created success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message});
    }
}

module.exports = createCardHandler;