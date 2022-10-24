const moveToDeliveringOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                order_id: {
                    type: 'string'
                }
            },
            required: ['order_id']
        }
    }
}

module.exports = moveToDeliveringOpts;