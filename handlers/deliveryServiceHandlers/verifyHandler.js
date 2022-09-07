function verifyHandler(request, response) {
    const { email, businessName, businessRegNo, location } = request.body;
    response.code(200).send({ message: 'verified' });
};


module.exports = verifyHandler;