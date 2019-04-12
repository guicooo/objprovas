import { ITransmissao } from "./ITransmissao";

module App{
    export interface IEvento {

        id: string,
        titulo: string,
        alias: string,
        iniciadoEm: Date,   
        aovivo: boolean,
        duracao: string,
        descricao: string,
        criadoEm: Date,
        alteradoEm: Date,
        transmitindo: ITransmissao,
        transmissoes: ITransmissao[],           
        status: string
    }
}