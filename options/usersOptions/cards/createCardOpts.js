const createCardOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                card: {
                    type: 'object',
                    properties: {
                        number: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        exp_month: {
                            type: 'number'
                        },
                        exp_year: {
                            type: 'number'
                        },
                        cvc: {
                            type: 'string'
                        },
                        address: {
                            type: 'string'
                        }
                    },
                    required: ['number', 'name', 'exp_month', 'exp_year', 'cvc', 'address']
                }
            },
            required: ['card']
        }
    }
}

module.exports = createCardOpts;