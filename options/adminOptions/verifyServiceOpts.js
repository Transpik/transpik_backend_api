const verifyServiceOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                verification_id: {
                    type: 'string'
                },
            },
            required: ['verification_id']
        }
    }
}

module.exports = verifyServiceOpts;