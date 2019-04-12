import { ToastsManager } from 'ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';
import { IGrade } from '../interfaces/IGrade';
import { IProva } from '../interfaces/IProva';
import { IQuestao } from '../interfaces/IQuestao';

@Injectable()
export class AppService {
    public token: string = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    public listaGrade: IGrade[] = localStorage.getItem('grade') ? <any>JSON.parse(localStorage.getItem('grade')) : <any>'';
    public serie: string = localStorage.getItem('serie') ? localStorage.getItem('serie') : '';
    public nomeDoAluno = '';
    public questoesProva: any = '';
    public provaAtiva: IProva;
    public questaoAtiva: IQuestao;
    public textoApoio: string;
    public videos: any[] = [];
    public conteudo: any[] = [];
    public exercicios: any[] = [];
    public jogos: any[] = [];
    public classeCheckConteudo = '';
    public classeCheckVideos = '';
    public classeCheckResolucao = '';
    public classeCheckApoio = '';
    public classeCheckExercicios = '';
    public classeCheckJogos = '';
    public quantidadeLiProvas = 0;
    public quantidadeLiClicadasProvas = 0;
    public porcRevisao = 75;
    public indiceResposta: any;
    public urlImagemTarefaNet = 'http://www.objetivo.br/tarefanet/Api/Asserts/Images/' // "http://200.174.103.116/tarefanet/Api/Asserts/Images/"
    
    constructor() { }
    
}