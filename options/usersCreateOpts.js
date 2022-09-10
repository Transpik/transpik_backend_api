const usersCreateOpts = {
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
                    enum: ['ecommerce', 'delivery']
                }
            },
            required: ['email', 'type', 'password']
        }
    }
}

module.exports = usersCreateOpts;