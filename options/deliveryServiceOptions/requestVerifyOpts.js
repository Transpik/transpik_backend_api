const requestVerifyOpts = {
    schema: {
        body: {
            type: 'object',
            properties : {
                email: {
                    type: 'string',
                    format: 'email',
                },
                business_name: {
                    type: 'string',
                },
                business_reg_no: {
                    type: 'string',
                },
                location: {
                    type: 'object',
                    properties: {
                        address: {
                            type: 'string',
                        },
                        postal_code: {
                            type: 'number',
                        },
                        city: {
                            type: 'string',
                        },
                        country: {
                            type: 'string',
                        },
                        country_code: {
                            type: 'string'
                        }
                    },
                    required: ['address', 'city', 'postal_code', 'country', 'country_code'],
                },
            },
            required: ['email', 'business_name', 'business_reg_no', 'location'],
        }
    }
};   

module.exports = requestVerifyOpts;