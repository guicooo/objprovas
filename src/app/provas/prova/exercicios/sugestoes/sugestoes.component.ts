import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  @Input() questaoAtiva;
  public sugestaoAtiva = '';
  public imgSugestaoAtiva = '';
  constructor(public appService: AppService) { }

  ngOnInit() {    
    this.sugestaoAtiva = this.questaoAtiva.sugestoes[0].texto;    
    this.imgSugestaoAtiva = this.questaoAtiva.sugestoes[0].textoImg;

    $('#exampleModal').on('show.bs.modal', function () {
      $('.number-title-sugestoes > .ativo').trigger('click');
    })
  }

  obter(item, event) {    
    this.sugestaoAtiva = item.texto;        
    this.imgSugestaoAtiva = this.appService.urlImagemTarefaNet + item.textoImg.toString().replace('~/','');   
    $('.number-title-sugestoes > .ativo').removeClass('ativo');
    $(event.target).addClass('ativo');
  }
}
