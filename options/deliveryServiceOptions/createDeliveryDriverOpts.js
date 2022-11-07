const createDeliveryDriverOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                initials: {
                    type: 'string'
                },
                last_name: {
                    type: 'string'
                },
                serving_city: {
                    type: 'string',
                },
                postal_code: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
            required: ['initials', 'email', 'password', 'postal_code', 'serving_city', 'last_name']
        }
    }
}

module.exports = createDeliveryDriverOpts;