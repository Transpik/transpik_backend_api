const removeServiceConfigOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                service_id: { type: 'string' }
            },
            required: ['service_id']
        }
    }
};

module.exports = removeServiceConfigOpts;