const moveToProccessingOpts = {
    body: {
        schema: {
            type: 'object',
            properties: {
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