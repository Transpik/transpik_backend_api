async function removeCardHandler(request, response) {
    const user = request.user;
    const { card_id } = request.body;
    try{
        const card = user.cards.id(card_id);
        if(!card) throw new Error('card not exists');

        const deleted = await user.removeCard();
        response.code(200).send({ data: { deleted: deleted }, message: 'delete success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message})
    }
}

module.exports = removeCardHandler;