const jwt = require('jsonwebtoken');
const DeliveryUser = require('../../../models/DeliveryUser');
const EcommerceUser = require('../../../models/EcommerceUser');
const RefreshToken = require('../../../models/RefreshToken');
const KEY = process.env.TOKEN_KEY;


async function silentAuthHandler(request, response) {
    const { refreshToken } = request.body;
    try {
        if(!refreshToken) throw new Error('refresh token not found');

        const payload = jwt.verify(refreshToken, KEY)
        const user = (payload.aud === 'ecommerce') ? await EcommerceUser.findById(payload.sub) :
        await DeliveryUser.findById(payload.sub);

        if(!user) throw new Error('user not found');
        const accessTokenPeriod = '2d';
        const iss = 'https://transpikapi.onrender.com';
        const accessTokenKey = await jwt.sign({}, KEY, {
            audience: user.type,
            expiresIn: accessTokenPeriod,
            subject: user._id.toString(),
            issuer: iss
        });

        response.code(200).send({ data: { accessToken: accessTokenKey, refreshToken: refreshToken}, message: 'success'});
    }catch(error) {
        response.code(304).redirect(303, 'https://transpikland.onrender.com/login');
    }
}

module.exports = silentAuthHandler;