import { ISlide } from './ISlide.';
import { IParticipante } from './IParticipantes';
import { ILegendas } from './ILegendas';
import { IMedia } from './IMedia';

    export interface ITransmissao{
        id: any,
        titulo: string,       
        alias: string,
        ordem: number,
        capa: string, 
        midias: IMedia[],      
        aovivo: string,
        duracao: string,
        descricao: string, 
        criadoEm: Date,
        alteradoEm: Date,       
        status: string,
        sinalizacoes: ISlide[],
        legendas: ILegendas[],
        participantes: IParticipante[]
    }
