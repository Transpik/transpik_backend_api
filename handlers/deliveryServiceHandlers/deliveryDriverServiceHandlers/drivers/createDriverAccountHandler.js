const Driver = require('../../../../models/Driver');

async function createDriverAccountHandler(request, response) {
    const user = request.user;
    const { initials, last_name, serving_city, postal_code, email, password } = request.body;
    try {
        const driver = new Driver({
            initials: initials,
            last_name: last_name,
            serving_city: serving_city,
            postal_code: postal_code,
            email: email,
            password: password,
            service_id: user._id
        });

        await driver.save();
        response.code(200).send({ data: { driver: driver }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = createDriverAccountHandler;