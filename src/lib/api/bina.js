class Bina {

    path = '/bina';

    _opcoes;
    _client;

    /**
     * @param {Client} httpClient
     * @param {object} opcoes
     * @return {Promise}
     */
    constructor(httpClient, opcoes) {
        this._client = httpClient;
        this._opcoes = opcoes;
    }

    /**
     * Envia um número pra receber um código de validação
     * @param {string} telefone
     * @param {object} opcoes
     * @param {string} opcoes.mensagem_sms
     * @param {string} opcoes.mensagem_tts
     * @return {Promise}
     */
    async cadastrar(telefone, opcoes) {
        const dados = {
            telefone: telefone,
            mensagem_sms: opcoes.mensagem_sms,
            mensagem_tts: opcoes.mensagem_tts
        };
        return await this._client.post(`${this.path}`, {telefone});
    }

    /**
     * Verifica se o código é válido para o telefone
     * @param {string} codigo
     * @param {string} telefone
     * @return {Promise}
     */
    async validar(telefone, codigo) {
        return await this._client.get(`${this.path}`, {
            params: {
                codigo,
                telefone
            }
        });
    }

    /**
     * Busca informações da bina usando ID
     * @param {number} id
     * @return {Promise}
     */
    async buscar(id) {
        return await this._client.get(`${this.path}/${id}`);
    }

    /**
     * Exclui uma bina cadastrada usando ID
     * @param {number} id
     * @return {Promise}
     */
    async excluir(id) {
        return await this._client.delete(`${this.path}/${id}`);
    }
}

module.exports = Bina;
