const updateAccountDetailsOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                name: { type: 'string' },
            }
        },
        required: ['url', 'name']
    }
}

module.exports = updateAccountDetailsOpts;