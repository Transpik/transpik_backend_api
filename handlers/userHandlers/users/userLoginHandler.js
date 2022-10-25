const bcrypt = require('bcrypt');
const DeliveryUser = require('../../../models/DeliveryUser');
const EcommerceUser = require('../../../models/EcommerceUser');
const {RefreshToken} = require('../../../models/RefreshToken');
const jwt = require('jsonwebtoken');

const KEY = require('../../../utils/KEY');

async function userLoginHandler(request, response) {
    const { email, password, type } = request.body;
    try {
        const user = (type === 'delivery') ? await DeliveryUser.findOne({ email }).exec() : await EcommerceUser.findOne({ email }).exec();
        // if user doesn't exists
        if(!user) throw new Error("User doesn't exists");

        // check password validity
        const validity = await bcrypt.compare(password, user.password);
        // password not matching
        if(!validity) throw new Error('Email or password incorrect');

        // when password valid
        const refreshTokenPeriod = '30d';
        const iss = 'https://transpikapi.onrender.com';
        const refreshTokenKey = await jwt.sign({
            period: refreshTokenPeriod, 
        }, KEY, 
        {
            audience: type,
            expiresIn: refreshTokenPeriod,
            subject: user._id.toString(),
            issuer: iss
        });

        const accessTokenPeriod = '2d';
        const accessTokenKey = await jwt.sign({}, KEY, {
            audience: type,
            expiresIn: accessTokenPeriod,
            subject: user._id.toString(),
            issuer: iss
        });

        const refreshToken = new RefreshToken({ 
            key: refreshTokenKey,
            aud: type,
            period: accessTokenPeriod,
            iss: iss,
            sub: user._id.toString(),
        });

        await refreshToken.save();
        await user.save();
        let redirect = (user.type === 'delivery') ? 'https://transpikdel.onrender.com' : 'https://transpikecom.onrender.com';
        redirect = redirect+'?auth='+refreshTokenKey; 
        response.code(200).send({
            data: {
                redirect: redirect,
                user: {
                    user_id: user._id,
                    email: user.email,
                    type: user.type
                },
                tokens: {
                    refresh_token: refreshTokenKey,
                    access_token: accessTokenKey
                }
            },
            message: "user login success"
        })
    }catch(err) {
        response.code(400).send({ data: {}, message: err.message });
    }
    
}

module.exports = userLoginHandler;