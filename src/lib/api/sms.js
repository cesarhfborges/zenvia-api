class Sms {

    path = '/sms';

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
     * Envia um SMS para o numero informado
     * @param {string} numero_destino
     * @param {string} mensagem
     * @param {object} opcoes
     * @param {boolean} opcoes.resposta_usuario
     * @param {boolean} opcoes.multi_sms
     * @param {string} opcoes.tags
     * @param {string} opcoes.data_criacao
     * @return {Promise}
     */
    async enviar(numero_destino, mensagem, opcoes) {
        const dados = {
            numero_destino: numero_destino,
            mensagem: mensagem,
            resposta_usuario: opcoes.resposta_usuario,
            multi_sms: opcoes.multi_sms,
            tags: opcoes.tags,
            data_criacao: opcoes.data_criacao,
        };
        return await this._client.post(`${this.path}`, dados);
    }

    /**
     * Após o envio de mensagens de SMS você poderá realizar a busca do registro pelo seu ID.
     * @param {number} id
     * @return {Promise<*>}
     */
    async buscar(id) {
        return await this._client.get(`${this.path}/${id}`);
    }

    /**
     *
     * @param {string} data_inicio
     * @param {string} data_fim
     * @param {object} opcoes
     * @param {string} opcoes.posicao
     * @param {string} opcoes.limite
     * @return {Promise<*>}
     */
    async relatorio(data_inicio, data_fim, opcoes) {
        return await this._client.get(`${this.path}/relatorio`, {
            params: {
                data_inicio,
                data_fim
            }
        });
    }
}

