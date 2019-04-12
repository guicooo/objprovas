import { IGrade } from "./IGrade";
import { IAlternativas } from "./IAlternativas";

export interface IQuestao {
    alteradoEm: string,
    ano: number,
    alternativas: IAlternativas,
    criadoEm: string,
    dificuldade: string,
    enunciado: string,
    frente: number,
    grade: IGrade,
    id: string,
    modulo: string,
    numero: number,
    numeroDoRegime: number,
    pontos: number,
    resposta: string,
    status: string,
    textoApoio: string,
    tipo: string
}