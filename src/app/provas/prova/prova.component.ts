import { Component, OnInit, Output } from '@angular/core';
import { ProvaService } from '../../services/provas.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IQuestao } from '../../interfaces/IQuestao';
import { IProva } from '../../interfaces/IProva';
import { AppService } from '../../services/app.service';
import { AulaService } from '../../services/aula.service';
import { ExerciciosService } from '../../services/exercicios.service';
import { QuestoesService } from '../../services/questoes.service';
import { ISidebar } from '../../interfaces/ISidebar';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.scss'],
  providers: [ ProvaService, AulaService, QuestoesService, ExerciciosService ]
})
export class ProvaComponent implements OnInit {
  @Output() prova: IProva;
  @Output() questaoAtiva: IQuestao;
  @Output() opcoesSidebar: ISidebar = { textoDeApoio : true, jogos: true, conteudos: true, exercicios: true, videos: true };

  public id;
  
  constructor(
    private _provasService: ProvaService, 
    private _appService: AppService, 
    private _router: ActivatedRoute, 
    private _aulaService: AulaService,
    private _questoesService: QuestoesService,
    private _exerciciosService: ExerciciosService,
    private _route: Router) { 

    this._router.firstChild 
      ? this._router.firstChild.paramMap.subscribe(( params: ParamMap ) : void => { this.id = params.get( "id" ); })
      : this._route.navigate(['/home'])

    this._provasService.obterProvaPorId(this.id)
              .then((data) => {
                  this.prova = data;                
                  this._appService.provaAtiva = this.prova;
              })
              .catch((error) =>  this._route.navigate(['/home']))
  }

  ngOnInit() { }

  obterQuestao(questao: IQuestao) {
  

    this.opcoesSidebar = { textoDeApoio : true, jogos: true, conteudos: true, exercicios: true, videos: true };
    if(questao.tipo.toLowerCase() == "alternativa") {
      this._questoesService.obterQuestaoAlternativa(questao.id)
              .then((data: IQuestao) => {
                  this.questaoAtiva = data;             
                  this.obterVinculos();
              })
              .catch(() => this._route.navigate(['/home']))
      
    } else {
      this._questoesService.obterQuestaoDiscursiva(questao.id)
            .then((data: IQuestao) => {
                this.questaoAtiva = data;              
                this.obterVinculos();
            })
            .catch(() => this._route.navigate(['/home']))
    }  
       

  }

  obterVinculos() {
    
    let resposta = this._appService.provaAtiva.gabaritos.find(x => x.numero == this.questaoAtiva.numero && x.tipo == this.questaoAtiva.tipo).resposta.toLowerCase();    
    this._appService.indiceResposta = EIndiceResposta[resposta];

    this._appService.questaoAtiva = this.questaoAtiva; 
             
    this._appService.textoApoio = this.questaoAtiva.textoApoio;
    
    // Habilita ou não o texto de apoio no sidebar
    this.opcoesSidebar.textoDeApoio =  this._appService.textoApoio ? true : false; 
    
    this._appService.conteudo = [];
    this._appService.jogos = [];
    this._appService.exercicios = [];       
    this._appService.videos = [];

    if(this.prova.gabaritos.find(x => x.numero == this.questaoAtiva.numero && x.tipo == this.questaoAtiva.tipo).percentual == 1) 
    {
      this.opcoesSidebar.jogos = false;
      this.opcoesSidebar.videos = false;
      this.opcoesSidebar.conteudos = false;
      this.opcoesSidebar.exercicios = false;
      return; 
    }
    
    this.obterAula(this.questaoAtiva.id);
    this.obterExercicios(this.questaoAtiva.id);
    // this.opcoesSidebar.exercicios = false; // remover quando for pra ter exercicios

    
  }

  obterAula(id: string) {
    this._aulaService.listarAula(id).subscribe((data: any) => {     
        this.tratarAula(data);       
    }, () => {

      this.opcoesSidebar.jogos = false;
      this.opcoesSidebar.videos = false;
      this.opcoesSidebar.conteudos = false;

    });
  }

  obterExercicios(id: string) {
    this._exerciciosService.listarExercicios(id).subscribe((data: any) => {    
        this._appService.exercicios = data.map(x => x.id);
        !this._appService.exercicios ? this.opcoesSidebar.exercicios = false : null;
    }, () => { this.opcoesSidebar.exercicios = false;  });
  }

  tratarAula(dados: any[]) {
   
    this._appService.conteudo = [];
    this._appService.jogos = [];      
    this._appService.videos = [];
    
    dados.forEach((value) => {         
      if(value.tag.indexOf("video") != -1)
        this._appService.videos.push(value.id);     
      if(value.tag.indexOf("iteratividade") != -1)
        this._appService.jogos.push(value.id);     
      if(value.tag.indexOf("nivelamento") != -1 || value.tag == "")
        this._appService.conteudo.push(value.id);       
    });

    if(this._appService.videos.length == 0)
      this.opcoesSidebar.videos = false;
    if(this._appService.jogos.length == 0)
      this.opcoesSidebar.jogos = false;
    if(this._appService.conteudo.length == 0)
      this.opcoesSidebar.conteudos = false;
    
  }

 
}

export enum EIndiceResposta {
  "a" = 0,
  "b" = 1,
  "c" = 2,
  "d" = 3,
  "e" = 4,
  "f" = 5,
  "g" = 6,
  "h" = 7
}
