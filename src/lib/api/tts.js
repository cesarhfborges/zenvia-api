/**
 * Classe de chamadas usando API
 *
 * @class Tts
 * @param {Client} _client
 * @param {object} _opcoes
 * @param {object} VOZES
 * @author Cesar Henrique
 */

class Tts {

    static VOZES = {
        CAMILA: 'br-Camila',
        VITORIA: 'br-Vitoria',
        RICARDO: 'br-Ricardo',
        JOEY: 'en-Joey',
        JOANNA: 'en-Joanna',
        CELINE: 'fre-Celine',
        MATHIEU: 'fre-Mathieu',
        VICKI: 'ger-Vicki',
        HANS: 'ger-Hans',
        CARLA: 'ita-Carla',
        GIORGIO: 'ita-Giorgio',
        MIZUKI: 'jap-Mizuki',
        JAN: 'pol-Jan',
        TATYANA: 'rus-Tatyana',
        MAXIM: 'rus-Maxim',
        CONCHITA: 'esp-Conchita',
        HENRIQUE: 'esp-Enrique',
    };

    path = '/tts';
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
     * @param {string} numero_destino
     * @param {string} mensagem
     * @param opcoes
     * @param {boolean} opcoes.resposta_usuario Aguardar uma resposta do destinatário.
     * @param opcoes.tipo_voz Idioma em que a mensagem deve ser lida e também o tipo da voz. [CAMILA, VITORIA, RICARDO, JOEY, JOANNA, CELINE, MATHIEU, VICKI, HANS, CARLA, GIORGIO, MIZUKI, JAN, TATYANA, MAXIM, CONCHITA, HENRIQUE]
     * @param opcoes.bina Número de telefone que aparecerá no identificador de quem receber a chamada, formato DDD + Número. Exemplo: 4832830151
     * @param opcoes.gravar_audio Gravar a ligação
     * @param opcoes.detecta_caixa Caso seja identificado caixa postal a ligação será derrubada antes que inicie a mensagem para a caixa postal. Esse serviço tem um custo adicional.
     * @param opcoes.bina_inteligente Quando o valor for true, ao enviar o torpedo o número de telefone que aparecerá para o destino será um número com DDD de sua região. Veja DDDs disponíveis.
     * @param opcoes.chamada_verificada Um valor booleano para identificar se o tts terá chamada verificada
     * @param opcoes.motivo_vcall Id do motivo vcall da chamada verificada
     * @return {Promise}
     */
    async ligar(numero_destino, mensagem, opcoes= {}) {
        const dados = {
            numero_destino: numero_destino,
            mensagem: mensagem,
            resposta_usuario: opcoes.resposta_usuario || null,
            tipo_voz: opcoes.tipo_voz || null,
            bina: opcoes.bina || null,
            gravar_audio: opcoes.gravar_audio || null,
            detecta_caixa: opcoes.detecta_caixa || null,
            bina_inteligente: opcoes.bina_inteligente || null,
            chamada_verificada: opcoes.chamada_verificada || null,
            motivo_vcall: opcoes.motivo_vcall || null,
        };
        return await this._client.post(`${this.path}`, dados);
    }

    /**
     * Retorna o relatório de chamdas efetuadas, datas devem estar no formato YYYY-MM-dd.
     * @param {string} dataInicio data de inicio
     * @param {string} dataFim data final
     * @return {Promise}
     */
    async relatorio(dataInicio, dataFim) {
        return await this._client.get(`${this.path}/relatorio?data_inicio=${dataInicio}&data_fim=${dataFim}'`);
    }
}

module.exports = Tts;
