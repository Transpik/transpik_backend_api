async function listCardsHandler(request, response) {
    const user = request.user;
    try {
        const cards = await user.listAllCards();
        response.code(200).send({ data: { cards: cards }, message: error.message });
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = listCardsHandler;