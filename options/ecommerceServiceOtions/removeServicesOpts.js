const removeServiceOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                delivery_service_id: { type: 'string' }
            }
        },
        required: ['delivery_service_id']
    }
};

module.exports = removeServiceOpts;