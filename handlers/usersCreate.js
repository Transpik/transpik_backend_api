const User = require('../models/User');

async function usersCreate(request, response) {
    const { email, password, type } = request.body;
    try {
        const user = new User({
            email: email,
            password: password,
            type: type
        });
        await user.save();
        response.code(201).send(user);
    }catch(err) {
        response.code(400).send({ message: err.message });
    }
}

module.exports = usersCreate;