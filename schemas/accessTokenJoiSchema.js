const Joi = require('joi');

const accessTokenSchema = Joi.object({
    exp: Joi.number(),
    aud: Joi.string().valid('ecommerce', 'delivery'),
    sub: Joi.string(),
    iss: Joi.string(),
    iat: Joi.number()
});

module.exports = accessTokenSchema;