async function deleteServiceHandler(request, response) {
    const user = request.user;
    const { delivery_service_id } = request.body;
    try {
        const usingServices = user.usingServices;
        if(usingServices.indexOf(delivery_service_id) < 0) throw new Error('service is not using');
        user.usingServices.pull(delivery_service_id);
        await user.save();
        response.code(200).send({ data: { using_services: usingServices }, message: "success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = deleteServiceHandler;