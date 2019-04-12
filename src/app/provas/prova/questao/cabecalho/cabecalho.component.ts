import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {
  public numero = 1;
  public dificuldade = '';
  public tipo = '';
  public instituto = 'Objetivo';

  @Input() 
  set questaoAtiva(questao) {
    this.numero = questao.numero;
    this.dificuldade = EPeso[questao.dificuldade];
    this.tipo = questao.tipo == 'Alternativa' ? 'Questão objetiva' : 'Questão ' + questao.tipo;    
  }
  
  constructor() { }

  ngOnInit() { }
 
}


export enum EPeso {
  "Facil" = "Fácil",
  "Medio" = "Médio",
  "Dificil" = "Difícil",
}