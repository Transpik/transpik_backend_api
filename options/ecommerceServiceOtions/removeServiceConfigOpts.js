const removeServiceConfigOpts = {
    schema: {
        body: {
            type: 'object',
            service_id: { type: 'string' }
        },
        required: ['service_id']
    }
};

module.exports = removeServiceConfigOpts;