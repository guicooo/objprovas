import { IServidorSlide } from './IServidoresSlide';

    export interface ISlide{
        
        tipo: any,
        tempo: string,
        comando: string,
        id: string,
        rotulo: string,
        diretorio: string,
        descricao: string,
        criadoEm: Date,
        alteradoEm: Date,
        status: boolean,
        arquivos: string[],
        servidores: IServidorSlide[]
    }
