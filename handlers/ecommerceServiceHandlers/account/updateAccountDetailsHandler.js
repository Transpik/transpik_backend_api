async function updateAccountDetailsHandler(request, response) {
    const user = request.user;
    const { url, name } = request.body;
    try {
        user.url = url;
        user.name = name;
        await user.save();
        response.code(200).send( { data: { user : user }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = updateAccountDetailsHandler;