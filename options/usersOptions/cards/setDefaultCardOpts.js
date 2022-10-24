const setDefaultCardOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                card_id: { 
                    type: 'string'
                }
            },
            required: ['card_id']
        }
    }
}

module.exports = setDefaultCardOpts;