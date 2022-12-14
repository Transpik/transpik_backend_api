const updatePasswordOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                old_password: { type: 'string' },
                new_password: { type: 'string' },
            }
        },
        required: ['old_password', 'new_password']
    }
}

module.exports = updatePasswordOpts;