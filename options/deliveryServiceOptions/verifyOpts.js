const verifyOpts = {
    schema: {
        body: {
            type: 'object',
            properties : {
                email: {
                    type: 'string',
                    format: 'email',
                },
                businessName: {
                    type: 'string',
                },
                businessRegNo: {
                    type: 'string',
                },
                location: {
                    type: 'object',
                    properties: {
                        address: {
                            type: 'string',
                        },
                        state: {
                            type: 'string',
                        },
                        stateCode: {
                            type: 'number',
                        },
                        city: {
                            type: 'string',
                        },
                        country: {
                            type: 'string',
                        }
                    },
                    required: ['address', 'state', 'stateCode', 'city', 'country'],
                },
                required: ['email', 'businessName', 'businessRegNo', 'location'],
            }
        }
    }
};   

module.exports = verifyOpts;