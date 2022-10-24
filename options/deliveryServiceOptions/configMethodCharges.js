const configMethodCharges = {
    schema: {
        body: {
            type: 'object',
            properties: {
                express: {
                    type: 'object',
                    properties: {
                        fee: { type: 'number' },
                        discription: { type: 'string' },
                        available: { type: 'boolean' },
                        within: {
                            type: 'object',
                            properties: {
                                min: { type: 'integer' },
                                max: { type: 'integer' },
                                unit: {
                                    type: 'string',
                                    enum: ['days', 'weeks']
                                }
                            },
                            required: ['min', 'max', 'unit']
                        },
                        required: ['fee', 'available', 'discription', 'within']
                    }
                },
                oneday: {
                    type: 'object',
                    properties: {
                        fee: { type: 'number' },
                        discription: { type: 'string' },
                        available: { type: 'boolean' }
                    },
                    required: ['fee', 'discription', 'available']
                }
            }
        }
    }
}

module.exports = configMethodCharges;