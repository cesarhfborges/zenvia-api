
/**
 * A funcionalidade Chamada permite que você crie chamadas perna A e perna B, podendo gravar as ligações, agendar e binar o seu próprio número. Permite gerar relatório de chamadas, derrubar chamadas em andamento, transferir chamadas e avaliação de chamadas.
 *
 * @class Audio
 * @param {Client} _client
 * @author Cesar Henrique
 */
class Audio {

    path = '/audio';

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
     * Envia um audio para um número destino
     * @param numero_destino
     * @param url_audio
     * @param opcoes
     * @param opcoes.resposta_usuario
     * @param opcoes.gravar_audio
     * @param opcoes.bina
     * @param opcoes.detecta_caixa
     * @param opcoes.bina_inteligente
     * @param opcoes.chamada_verificada
     * @param opcoes.motivo_vcall
     * @return {Promise}
     */
    async ligar(numero_destino, url_audio, opcoes) {
        const dados = {
            numero_destino: numero_destino,
            url_audio: url_audio,
            resposta_usuario: opcoes.resposta_usuario,
            gravar_audio: opcoes.gravar_audio,
            bina: opcoes.bina,
            detecta_caixa: opcoes.detecta_caixa,
            bina_inteligente: opcoes.bina_inteligente,
            chamada_verificada: opcoes.chamada_verificada,
            motivo_vcall: opcoes.motivo_vcall,
        };
        return await this._client.post(`${this.path}`, dados);
    }

    /**
     * Busca um audio pelo seu ID
     * @param {int} id
     * @return {Promise}
     */
    async buscar(id) {
        return await this._client.get(`${this.path}/${id}`)
    }

    /**
     * Relatório de mensagens de Audios
     * @param {string} data_inicio
     * @param {string} data_fim
     * @return {Promise}
     */
    async relatorio(data_inicio, data_fim) {
        return await this._client.get(`${this.path}/relatorio`, {
            params: {
                data_inicio,
                data_fim
            }
        })
    }
}

module.exports = Audio;
