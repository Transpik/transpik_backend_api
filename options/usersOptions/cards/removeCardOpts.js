const removeCardOpts = {
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

module.exports = removeCardOpts;