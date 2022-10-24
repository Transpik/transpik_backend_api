const { Verification } = require('../../../models/Verification');

async function createVerificationHandler(request, response) {
    const { 
        email,
        business_name,
        business_reg_no,
        location,
    } = request.body;

    try {
        if(email !== request.user.email) throw new Error('Invalid verification details');

        const delivery_service_id = request.user._id;
        const verification = new Verification({ email, business_name, business_reg_no, location, delivery_service_id });
        await verification.save();
        response.code(201).send( { data: { verification: verification._doc }, message: "verification request created" }); 
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
};

module.exports = createVerificationHandler;