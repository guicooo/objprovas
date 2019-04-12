import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { IProva } from '../../interfaces/IProva';
import { IQuestao } from '../../interfaces/IQuestao';
import { AppComponent } from '../../app.component';
import { ISidebar } from '../../interfaces/ISidebar';


@Component({
  selector: 'app-sidebar-prova',
  templateUrl: './sidebar-prova.component.html',
  styleUrls: ['./sidebar-prova.component.scss']
})
export class SidebarProvaComponent implements OnInit, OnDestroy {
  @Input() prova: IProva;
  @Input() opcoesSidebar: ISidebar;
 
  public porcentagem = 0;
 
  constructor(
    private _router: Router, 
    public appService: AppService
  ) { }

  ngOnInit() {     
    
    //  PARA INICIAR A PAGINA COM O SIDEBAR ABERTO, RETIRAR AS 2 LINHAS ABAIXO E A CLASSE OPEN DO HTML
    $( ".col-side" ).addClass('col-sidebar');
    $( ".col-cont" ).addClass('col-content');

    $(".openMenu-provas").click(function(){
      if ($('.openAlternative').length > 0){
        $( ".btn-alternative" ).trigger('click');
      }    
        $( ".openMenu-provas" ).toggleClass('change');
        $( ".sidebar-descricao-prova" ).toggleClass('open');
        $( ".col-side" ).toggleClass('col-sidebar');
        $( ".col-cont" ).toggleClass('col-content');

    });

  
    $(window).on("resize", () => { this.tamanhoTela(); });

    this.tamanhoTela();

  }

  tamanhoTela() {
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 767) { 
     
      $(document).off("click",".lista");
      $(document).on("click",".lista", function() {       
        $( ".openMenu-provas" ).trigger('click');
      });              
        
      $(".openMenu-provas").click(function(){
        $('body').toggleClass('scrollblock');
      });            
    }
  }

  buttonBack() {
    this._router.navigate(['disciplinas']);
  }

  calcularAproveitamento() {    
      var quantidadeLi = $('.sidebar-descricao-prova').find('li').length;
      var quantidadeClicada = $('.sidebar-descricao-prova').find('li').find('.check').length;
      this.porcentagem = ((quantidadeClicada/quantidadeLi) * 100)
      this.appService.porcRevisao = parseInt(this.porcentagem.toFixed(2));
  }
  
  sair() {
    this.appService.token = '';
    this._router.navigate(['login']);
  }

  ngOnDestroy() {
    this.appService.jogos = [];
    this.appService.exercicios = [];
    this.appService.conteudo = [];
    this.appService.videos = [];
    this.appService.textoApoio = '';
  }

}
