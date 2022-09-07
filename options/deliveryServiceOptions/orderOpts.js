const moveToProccessingOpts = {
    body: {
        schema: {
            type: 'object',
            propertise: {
                apiKey: {
                    type: 'string',
                },
                orderIds: {
                    type: 'array',
                }
            }
        }
    }
}