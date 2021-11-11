module.exports = {
    defaultResolve(data) {
        return Promise.resolve(data.data);
    },
    defaultReject(error) {
        return Promise.reject({
            message: error.message,
            code: error.code || error.response.status,
            data: error.response.data,
        });
    },
};
