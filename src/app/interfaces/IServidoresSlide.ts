import { ILocal } from './ILocal';
    export interface IServidorSlide{

        id: string,
        rotulo: string,
        login: string,
        descricao: string,
        criadoEm: Date,
        alteradoEm: Date,
        local: ILocal
    }
