const axios = require('axios');
const defaultResolve = require('./interceptor').defaultResolve;
const defaultReject = require('./interceptor').defaultReject;

/**
 * Módulo Cliente
 * @author Cesar Henrique
 */
class Client {

    _URL = 'https://voice-app.zenvia.com';
    _service;

    constructor(token, options) {
        let service = axios.create({
            baseURL: this._URL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': token,
            },
        }, options);
        service.options()
        service.interceptors.response.use(defaultResolve, defaultReject);
        this._service = service;
    }

    async get(path) {
        return await this._service.get(path);
    }

    async post(path, payload) {
        return await this._service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }

    async delete(path) {
        return await this._service.request({
            method: 'DELETE',
            url: path,
            responseType: 'json',
        });
    }
}

module.exports = Client;
