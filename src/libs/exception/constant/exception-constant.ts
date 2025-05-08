export const AppMessages = {
    COMMON: {
        BAD_REQUEST: { code: 400, error:'Bad Request', message: 'Validation failed'},
        NOT_FOUND : { code: 404, error:'Not Found', message: 'The requested resource does not exist'},
        UNAUTHORIZED : { code: 401, error:'Unauthorized', message: 'Authentication requred or failed' },
        FORBIDDEN: { code: 403, error:'Forbidden', message: 'Access Denied' },
        INTERNAL_ERROR: { code: 500, error:'Internal Server Error', message: 'An unexpected error occurred' },
    }
}