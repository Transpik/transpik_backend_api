async function retriveServiceHandler(request, response) {
    const user = request.user;
    try {
        const usingServices = user.usingServices;
        response.code(200).send({ data: { using_services: usingServices }, message: "success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = retriveServiceHandler;