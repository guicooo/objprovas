import { IGrade } from "./IGrade";

export interface IMediaDisciplina {
    id: string,
    nome: string,
    media: number,
    totalNotaMaxima: number,
    totalNota: number,
    quantidadeDeProvas: number
}