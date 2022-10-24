async function setDefaultCardHandler(request, response) {
    const user = request.user;
    const {card_id} = request.body;
    try {
        const card = user.cards.id(card_id);
        if(!card) throw new Error('card not found');

        const customer = await user.setDefaultCard(card.card_id);
        response.code(200).send({ data: { customer: customer }, message: "default card set success"});
    }catch(error) {
        response.code(400).send({ data: { }, message: error.message});
    }
}

module.exports = setDefaultCardHandler;