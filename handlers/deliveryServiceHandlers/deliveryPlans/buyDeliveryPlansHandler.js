async function buyDeliveryPlansHandler(request, response) {
    const { product_id, card_info } = request.body;
    const user = request.user;
    try {
        // check if the user is already a customer
        if(!user.customer_id && !card_info) throw new Error('Please porvide card details');

        // create a customer
        if(!user.customer_id && card_info) {

        } 
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = buyDeliveryPlansHandler;