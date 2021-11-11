const Client = require('./client');
const Chamada = require('./api/chamada');
const Tts = require('./api/tts');
const Audio = require('./api/audio');
const Bina = require('./api/bina');
const Sms = require('./api/sms');
const Verificacao = require('./api/verificacao');

const op = {
    baseURL: 'https://voice-app.zenvia.com',
    token: null,
    remetente: null
};

/**
 * API Zenvia para Chamadas e SMS via API, integração e automatização de sistemas.
 *
 * @class Zenvia
 * @param {opcoes} _opcoes {token: string, baseURL: string e remetente: string}.
 * @param {Chamada} chamada
 * @param {Tts} tts
 * @author Cesar Henrique
 */
class Zenvia {

    _opcoes = {
        numero_origem: null
    };

    _service;
    audio;
    bina;
    chamada;
    sms;
    tts;
    verificacao;

    constructor(opts = op) {
        this._opcoes = opts;
        this._service = new Client(this._opcoes.token, {});
        this.audio = new Audio(this._service, this._opcoes);
        this.bina = new Bina(this._service, this._opcoes);
        this.chamada = new Chamada(this._service, this._opcoes);
        this.sms = new Sms(this._service, this._opcoes);
        this.tts = new Tts(this._service, this._opcoes);
        this.verificacao = new Verificacao(this._service, this._opcoes);
    }
}

module.exports = Zenvia;
