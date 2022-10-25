async function retriveAccountHandler(request, response) {
    const user  = request.user;
    try {
        response.code(200).send({ data: { user: user }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveAccountHandler;