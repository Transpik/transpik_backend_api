const Driver = require('../../../../models/Driver');

async function listDriverHandler(request, response) {
    const user = request.user;
    try {
        const drivers = await Driver.find({ service_id: user._id });
        response.code(200).send({ data: { drivers: drivers }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message });
    }
}

module.exports = listDriverHandler;