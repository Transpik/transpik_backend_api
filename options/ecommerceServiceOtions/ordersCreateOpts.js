const ordersCreateOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                delivery_method: { 
                    type: 'string',
                    enum: ['express', 'normal', 'oneday'],
                },
                package_options: { 
                    type: 'object',
                    properties: {
                        fragile: { type: 'boolean' },
                        foods: { type: 'boolean' },
                        care: { type: 'boolean' },
                        normal: { type: 'boolean' },
                    },
                },
                pickup_location: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        city: { type: 'string' },
                        postal_code: { type: 'number' },
                        country: { type: 'string' },
                    },
                    required: ['address', 'city', 'postal_code', 'country'],
                },
                delivery_location: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        city: { type: 'string' },
                        postal_code: { type: 'number' },
                        country: { type: 'string' },
                    },
                    required: ['address', 'city', 'postal_code', 'country'],
                },
                order_id: {
                    type: 'string'
                }
            },
            required: ['pickup_location','delivery_location'],
        }
    }
};

module.exports = ordersCreateOpts;