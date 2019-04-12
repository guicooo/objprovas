import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProvaService } from '../../../services/provas.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProva } from '../../../interfaces/IProva';
import { DomSanitizer } from '@angular/platform-browser';
import { IQuestao } from '../../../interfaces/IQuestao';
import { AppService } from '../../../services/app.service';
import { QuestoesService } from '../../../services/questoes.service';

@Component({
  selector: 'app-alternative-bar',
  templateUrl: './alternative-bar.component.html',
  styleUrls: ['./alternative-bar.component.scss'],
  providers: [ QuestoesService ]
})
export class AlternativeBarComponent implements OnInit {
  public questoes: IQuestao[] = [];
  public numeroDaQuestao = 1;
  public id;
  @Input() prova: IProva;
  @Output() trocaQuestao =  new EventEmitter();

  constructor(
    private _provasService: ProvaService, 
    private _questoesService: QuestoesService, 
    private _appService: AppService,   
    private _router: ActivatedRoute, 
    private _route: Router) { 
    
      
    
    this._router.firstChild.paramMap.subscribe(( params: ParamMap ) : void => { this.id = params.get( "id" ); });

    this._questoesService.listarQuestoesAlternativas(this.id).subscribe((data: any) => {      
        this.questoes = this.questoes.concat(data);   
        this._questoesService.listarQuestoesDiscursivas(this.id).subscribe((data: any) => {     
          this.questoes = this.questoes.concat(data);              
          this.tratarQuestoes();                                   
        },
        () => {
          this.tratarQuestoes();   
        });  
    },
    () => {
      this._questoesService.listarQuestoesDiscursivas(this.id).subscribe((data: any) => {     
        this.questoes = this.questoes.concat(data);              
        this.tratarQuestoes();                                   
      },
      () => {
        this.tratarQuestoes();
      }); 
    });  
  }

  buscarPercentual(item) {    
    var percentual = this.prova.gabaritos.find(x => x.numero == item.numero && x.tipo == item.tipo).percentual
    return percentual
  }

  obterQuestao(id: string) { 
    let questao = this.questoes.find(x => x.id == id)
    this.numeroDaQuestao = this.questoes.findIndex(x => x.id == id) + 1;
    
    document.querySelectorAll('nav li.active')[0]
              ? document.querySelectorAll('nav li.active')[0].className = '' 
              : '';

    document.getElementById(questao.id) 
              ? document.getElementById(questao.id).className = 'active' 
              : '';
    
    this._appService.classeCheckApoio = '';                  
    this._appService.classeCheckConteudo = '';
    this._appService.classeCheckExercicios = '';
    this._appService.classeCheckResolucao = '';
    this._appService.classeCheckVideos = '';
    this._appService.classeCheckJogos = '';

    this.trocaQuestao.emit(questao);
    this._route.navigate(['prova/detalhes/', this.prova.id])
  }

  tratarQuestoes() {
    this.questoes.sort((a, b) => a.numero > b.numero ? 1 : -1)
    this.questoes.sort((a, b) => a.tipo > b.tipo ? 1 : -1);          
    this.questoes.reverse();    
    
    if(navigator.userAgent.indexOf("Firefox") > -1) {
      // this.questoes.sort((a, b) => a.numero > b.numero ? 1 : -1);
      this.questoes.sort((a, b) => a.tipo > b.tipo ? 1 : -1);  
      this.questoes.reverse();       
    }   
    
    this.obterQuestao(this.questoes[0].id)  
  }

  ngOnInit() {

    $('.m_nav_proff, .btn-alternative').click(function(){
      if ($('.open').length <= 0){
        $( ".openMenu-provas" ).trigger('click');
      }      
      $('.m_nav_proff').toggleClass('openAlternative');

    });  

  }

}
