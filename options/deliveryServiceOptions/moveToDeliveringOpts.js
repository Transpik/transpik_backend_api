const moveToDeliveringOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                order_id: {
                    type: 'string'
                },
                driver_id: {
                    type: 'string'
                }
            },
            required: ['order_id', 'driver_id']
        }
    }
}

module.exports = moveToDeliveringOpts;