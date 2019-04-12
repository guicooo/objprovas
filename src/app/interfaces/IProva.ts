import { IGrade } from "./IGrade";
import { ISerie } from "./ISerie";
import { ITipo } from "./ITipo";
import { IGabarito } from "./IGabarito";

export interface IProva {
    acertos: number,
    erros: string,
    alteradoEm: string,
    criadoEm: string,
    gabaritos: IGabarito[],
    grade: IGrade,
    id: string,
    notaFinal: number,
    notaMaxima: number,
    parciais: number,
    rotulo: string,
    serie: ISerie,
    status: string,
    tipo: ITipo
}