exports.successResponse = (message = '', data = null) => {
    return {
        status: 'success',
        success: true,
        message,
        data
    }
}
exports.errorResponse = (message = '', data = null) => {
    return {
        status: 'error',
        success: false,
        message,
        data
    }
}