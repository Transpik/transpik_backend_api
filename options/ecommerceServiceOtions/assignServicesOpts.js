const assignServicesOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                configs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            countryCode: { type: 'string' },
                            postalCode: { type: 'number' },
                            service_id: { type: 'string' }
                        },
                        required: ['countryCode', 'postalCode', 'service_id']
                    }
                }
            },
            required: ['configs']
        }
    }
}

/*{
    [{ cc: 'LK', code: 11725, id: 'fvd425' }]
}*/

module.exports = assignServicesOpts;