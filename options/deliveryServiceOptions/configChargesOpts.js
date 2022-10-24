const configChargesOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                city_fees: {
                    type: 'object',
                        properties: {
                            config_id: {
                                type: 'string'
                            },
                            fee: {
                                type: 'number'
                            },
                            availability: {
                                type: 'boolean'
                            }
                        },
                    required: ['config_id', 'fee', 'availability']
                },
            },
            required: ['city_fees']
        }
    }
}

module.exports = configChargesOpts;