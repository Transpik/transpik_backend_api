const updateServiceConfigOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                service_id: { type: 'string' },
                service_config_id: { type: 'string' },
                config_id: { type: 'string' } 
            },
            required: ['service_id', 'service_config_id', 'config_id']
        }
    }
}

module.exports = updateServiceConfigOpts;