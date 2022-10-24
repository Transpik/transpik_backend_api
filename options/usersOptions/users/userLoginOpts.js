const userLoginOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: {
                    type: 'string'
                },
                type: {
                    type: 'string',
                    enum: ['delivery', 'ecommerce']
                }
            },
            required: ['email', 'password', 'type']
        }
    }
}

module.exports = userLoginOpts;