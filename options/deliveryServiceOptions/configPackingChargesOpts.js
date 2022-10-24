const configPackingCharges = {
    schema: {
        body: {
            type: 'object',
            properties: {
                normal: {
                    type: 'object',
                    properties: {
                        fee: { type: 'number' },
                        available: { type: 'boolean' }
                    },
                    required: ['fee', 'available' ]
                },
                care: {
                    type: 'object',
                    properties: {
                        fee: { type: 'number' },
                        available: { type: 'boolean' }
                    },
                    required: ['fee', 'available' ]
                },
                food: {
                    type: 'object',
                    properties: {
                        fee: { type: 'number' },
                        available: { type: 'boolean' }
                    },
                    required: ['fee', 'available' ]
                },
                fragile: {
                    type: 'object',
                    properties: {
                        fee: { type: 'number' },
                        available: { type: 'boolean' }
                    },
                    required: ['fee', 'available' ]
                }
            },
            required: ['normal']
        }
    }
}

module.exports = configPackingCharges;