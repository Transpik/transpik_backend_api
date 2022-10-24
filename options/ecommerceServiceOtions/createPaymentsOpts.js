const createPaymentsOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                order_id: { type: 'string' },
                card: {
                    type: 'object',
                    properties: {
                        number: {
                            type: 'string'
                        },
                        exp_month: {
                            type: 'number'
                        },
                        exp_year: {
                            type: 'number'
                        },
                        cvc: {
                            type: 'number'
                        },
                    },
                    required: ['number', 'exp_month', 'exp_year', 'cvc']
                },
            },
            required: ['order_id', 'card']
        }
    }
}

module.exports = createPaymentsOpts;