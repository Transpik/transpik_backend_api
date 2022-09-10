const USER_TYPES = ['ecommerce', 'delivery'];

const usersGetByTypeOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    enum: USER_TYPES
                }
            },
            required: ['type']
        }
    }
};

const userGetByTypeAndIdOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    enum: USER_TYPES
                },
                id: {
                    type: 'string'
                }
            },
            required: ['type', 'id']
        }
    }
};

const userGetByIdOpts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                }
            },
            required: ['id']
        }
    }
}

module.exports = { usersGetByTypeOpts, userGetByTypeAndIdOpts, userGetByIdOpts };