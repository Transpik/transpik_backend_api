const createServiceConfigOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                delivery_service_id: { type: 'string' },
                config_id: { type: 'string' }
            },
            required: ['delivery_service_id', 'config_id']
        }
    }
}

module.exports = createServiceConfigOpts;