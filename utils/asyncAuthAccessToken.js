const jwt = require('jsonwebtoken');
const accessTokenSchema = require('../schemas/accessTokenJoiSchema');
const DeliveryUser = require('../models/DeliveryUser');
const EcommerceUser = require('../models/EcommerceUser');
const KEY = process.env.TOKEN_KEY;


async function asyncAuthAccessToken(request, response) {
    const accessToken = request.headers['access-token'];
    try {
        if(!accessToken) throw new Error('access token not found');
        
        const payload = await jwt.verify(accessToken, KEY);
        const value = await accessTokenSchema.validateAsync(payload);
        const user = (value.aud === 'delivery') ? await DeliveryUser.findById(value.sub).exec() : await EcommerceUser.findById(value.sub).exec();
        
        if(!user) throw new Error('invalid access token');

        request.user = user;
    }catch(error) {
        response.code(401).send({ data: {}, message: error.message });
    }
}

module.exports = asyncAuthAccessToken;