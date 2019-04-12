import { IDisciplina } from "./IDisciplina";
import { ISerie } from "./ISerie";
import { IRegime } from "./IRegime";

export interface IGrade {
    alteradoEm: string,
    criadoEm: string,
    disciplina: IDisciplina,
    id: string,
    regime: IRegime,
    serie: ISerie,
    status: boolean
}