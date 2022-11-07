async function createCustomerAccountHandler(request, response) {
    const user = request.user;
    try {
        if(user.customer_id) throw new Error('Customer already exits');
        await user.createCustomerAccount();
        user.save();
        response.code(200).send({ data: { customer_id: user.customer_id }, message: "customer created sucess"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = createCustomerAccountHandler;