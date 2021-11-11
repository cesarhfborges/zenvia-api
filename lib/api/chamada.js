/**
 * A funcionalidade Chamada permite que você crie chamadas perna A e perna B, podendo gravar as ligações, agendar e binar o seu próprio número. Permite gerar relatório de chamadas, derrubar chamadas em andamento, transferir chamadas e avaliação de chamadas.
 *
 * @class Chamada
 * @param {Client} _client
 * @author Cesar Henrique
 */
class Chamada {

    static MODO = {
        ESCUTA: 1,
        SUSSURRO: 2,
        CONFERENCIA: 3,
    };

    static PERNA = {
        ORIGEM: 'origem',
        DESTINO: 'destino',
    };

    path = '/chamada';

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
     * Realiza uma chamada telefônica entre dois números: A e B
     * @param {string} numero_origem Número origem (perna A), recebe a chamada primeiro do número destino. Exemplo: 4832830151.
     * @param {string} numero_destino Número destino (perna B), recebe a chamada após o número origem atender. Exemplo: 4832830151.
     * @param opcoes
     * @param {object} opcoes.data_criacao (Opcional): string | Informe uma data e hora para agendar a chamada. vazio = liga imediatamente. Data e Hora no formato UTC.
     * @param {object} opcoes.gravar_audio (Opcional): boolean | Flag que indica se o áudio da ligação deve ser gravado.
     * @param {object} opcoes.bina_origem (Opcional): string | Número de BINA que será apresentado na chamada para o número origem (perna A). Formato DDD + Número, exemplo: 4832830151.
     * @param {object} opcoes.bina_destino (Opcional): string | Número de BINA que será apresentado na chamada para o número destino (perna B). Formato DDD + Número, exemplo: 4832830151.
     * @param {object} opcoes.tags (Opcional): string | Tags ou comentários sobre esta chamada.
     * @param {object} opcoes.detecta_caixa_origem (Opcional):boolean | Desconecta automaticamente em até 3s caso caia em caixa postal (vivo, claro, tim, oi).
     * @return {Promise}
     */
    async ligar(
        numero_origem,
        numero_destino,
        opcoes = {},
    ) {
        const dados = {
            numero_origem: numero_origem,
            numero_destino: numero_destino,
            data_criacao: opcoes.data_criacao || null,
            gravar_audio: opcoes.gravar_audio || null,
            bina_origem: opcoes.bina_origem || null,
            bina_destino: opcoes.bina_destino || null,
            tags: opcoes.tags || null,
            detecta_caixa_origem: opcoes.detecta_caixa_origem || null,
        };
        return await this._client.post(`${this.path}`, dados);
    }

    /**
     * Encerra uma chamada entre dois numeros: A e B
     * @param {number} id ID da chamada ativa
     * @return {Promise}
     */
    async encerrar(id) {
        return await this._client.delete(`${this.path}/${id}`);
    }

    /**
     * Localiza uma chamada
     * @param {string} id ID da chamada
     * @return {Promise}
     */
    async buscar(id) {
        return await this._client.get(`${this.path}/${id}`);
    }

    /**
     * Localiza a gravação de uma chamada
     * @param {string} id ID da chamada
     * @return {Promise}
     */
    async downloadGravacao(id) {
        return await this._client.get(`${this.path}/${id}/gravacao`);
    }

    /**
     * Realiza a escuta de uma chamada ativa.
     * @param {string} id ID da chamada
     * @param {string} numero numero de telefone
     * @param {string} modo modo de escuta: [1 = escuta, 2 = sussurro, 3 = conferência]
     * @return {Promise}
     */
    async escutar(id, numero, modo = 1) {
        const dados = {numero: numero, modo: modo};
        return await this._client.post(`${this.path}/${id}/escuta`, dados);
    }

    /**
     * Realiza a transferencia de chamada ativa para outro numero, remetente ou destinatário.
     * @param {string} id ID da chamada
     * @param {string} numero_destino numero de telefone
     * @param {string} perna modo de escuta: [destino ou origem]
     * @return {Promise}
     */
    async transferir(id, numero_destino, perna = 'destino') {
        const dados = {numero: numero_destino, perna: perna};
        return await this._client.post(`${this.path}/${id}/transfer`, dados);
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

    /**
     * Avalie a Chamada para ter estatísticas de qualidade de seus clientes.
     * @param {string} id ID da chamada a ser avaliada
     * @param {string} nota Nota de 1 a 5
     * @param {string} comentario Texto de até 1000 caracteres com a avaliação.
     * @return {Promise}
     */
    async avaliar(id, nota, comentario) {
        if (nota && (nota < 1 || nota > 5)) {
            throw new Error('nota inválida, nota deve ser um valor entre 1 e 5.');
        }
        if (!comentario || comentario.length > 999) {
            throw new Error('É obrigatório informar um comentário de ate 1000 caractéres.');
        }
        const dados = {
            numero: nota,
            comentario: comentario,
        };
        return await this._client.post(`${this.path}/${id}/avaliar`);
    }
}

module.exports = Chamada;
