const mongoose = require('mongoose');
const User = require('../models/User');

async function usersGetByType(request, response) {
    const { type } = request.params;
    const users = await User.find({ type: type }).exec();
    response.code(200).send(users);
}

async function userGetByTypeAndId(request, resposne) {
    const { type, id } = request.params;
    const user = await User.find({ _id: id, type: type }).exec();
    resposne.code(200).send(user);
}

async function userGetById(request, response) {
    const { id } = request.params;
    const user = await User.findById(id).exec();
    response.code(200).send(user);
}

module.exports = { usersGetByType, userGetByTypeAndId, userGetById };