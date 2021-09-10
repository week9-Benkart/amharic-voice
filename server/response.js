const responseFailure = (message, code) => {
    return {
        success: false, 
        code: code,
        message: message
    }
}

const responseSuccess = (message, data=null) => {
    return {
        success: true, 
        data: data,
        message: message
    }
}

module.exports.responseFailure = responseFailure
module.exports.responseSuccess = responseSuccess