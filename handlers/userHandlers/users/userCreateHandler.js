const EcommerceUser = require('../../../models/EcommerceUser');
const DeliveryUser = require('../../../models/DeliveryUser');


const bcrypt = require('bcrypt');

async function userCreateHandler(request, response) {
    const { email, password, type } = request.body;
    try {

        const existsEcomUser = await EcommerceUser.findOne({ email }).exec();
        const existsDelUser = await DeliveryUser.findOne({ email }).exec();
        if(existsEcomUser || existsDelUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = (type === 'delivery')? new DeliveryUser({ email, password: hashedPassword }) : new EcommerceUser({ email, password: hashedPassword });

        await user.save();
        response.code(201).send({ data: {
            user: {
                email: user.email,
                user_id: user._id,
                type: user.type
            }
        }, message: "user created success"});
    }catch(err) {
        response.code(400).send({ data: {}, message: err.message });
    }
}

module.exports = userCreateHandler;