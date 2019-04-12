import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-enunciado',
  templateUrl: './enunciado.component.html',
  styleUrls: ['./enunciado.component.scss']
})
export class EnunciadoComponent implements OnInit {
  
  public imagem;
  public enunciado;
  public enunciadoImg;

  @Input()
  set questaoAtiva(questao) {
    this.imagem = questao.imagem ? questao.imagem : '';
    this.enunciadoImg = questao.enunciadoImg ? questao.enunciadoImg : '';
    this.enunciado = questao.enunciado;   
  }
  
  constructor(public appService: AppService) { }

  ngOnInit() { }

}
