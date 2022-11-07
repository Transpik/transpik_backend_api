const createRefundOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                payment_id: {
                    type: 'string'
                }
            },
            required: ['payment_id']
        }
    }
}

module.exports = createRefundOpts;