class Verificacao {

    path = '/verificacao';
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
     *
     * @param numero_destino
     * @param nome_produto
     * @param opcoes
     * @param opcoes.tamanho
     * @param opcoes.tts
     * @return {Promise<*>}
     */
    async enviar(numero_destino, nome_produto, opcoes) {
        const dados = {
            numero_destino: numero_destino,
            nome_produto: nome_produto,
            tamanho: opcoes.tamanho,
            tts: opcoes.tts
        };
        return await this._client.post(`${this.path}`, dados)
    }

    /**
     * consulta um pin enviado.
     * @param {number} id
     * @param {string} pin
     * @return {Promise<*>}
     */
    async consultar(id, pin) {
        return await this._client.get(`${this.path}`, {
            params: {
                id,
                pin
            }
        })
    }
}

module.exports = Verificacao;
