const bcrypt = require('bcrypt');

async function updateAccountPasswordHandler(request, response) {
    const user = request.user;
    const { old_password, new_password } = request.body;
    try {
        const validity = await bcrypt.compare(old_password, user.password);
        if(!validity) throw new Error('Password wrong');

        const newHashedPassword = await bcrypt.hash(new_password, 10);
        user.password = newHashedPassword;
        user.save();
        response.code(200).send( { data: { user : user }, message: 'success'});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message});
    }
}

module.exports = updateAccountPasswordHandler;