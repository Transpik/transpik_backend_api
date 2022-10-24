const buyPlansOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                product_id: {
                    type: 'string',
                },
                card_info: {
                    type: 'object',
                    properties: {
                        number: { 
                            type: 'string',
                            minLength: 12,
                            maxLength: 12 
                        },
                        exp_month: { type: 'number' },
                        exp_year: { type: 'number' },
                        cvc: { 
                            type: 'string',
                            minLength: 3,
                            maxLength: 3 
                        },
                        name: { type: 'string' },
                        address: { type: 'string' }
                    },
                    required: ['number', 'exp_month', 'exp_year', 'cvc', 'name', 'address']
                },
                required: ['product_id']
            }
        }
    }
}

module.exports = buyPlansOpts;