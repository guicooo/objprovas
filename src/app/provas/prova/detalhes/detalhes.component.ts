import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { IProva } from '../../../interfaces/IProva';
import { IQuestao } from '../../../interfaces/IQuestao';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  
  constructor(public appService: AppService, private domSanitizer: DomSanitizer) {
 
  }

  ngOnInit() { 
    
  }

  devolverDescricao(index: number, valor: string) {
    return EIndiceResposta[index] + ' - ' + valor.replace(/<p>/, '');
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

