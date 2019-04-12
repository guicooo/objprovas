import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Router } from '@angular/router';
import { ProvaService } from '../services/provas.service';
import { IProva } from '../interfaces/IProva';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ProvaService, SerieService ]
})
export class HomeComponent implements OnInit {

  public ultimasProvas: IProva[] = [];
  public dia: string;
  public mes: string;
  public ano: string;  

  constructor(private _appService: AppService, 
              private _router: Router, 
              private _serieService: SerieService,
              private _provasService: ProvaService) { }

  ngOnInit() {    

    let dataAtual = new Date();
    this.dia = dataAtual.getDate().toString();  
    this.mes = EMes[dataAtual.getMonth() + 1];
    this.ano = dataAtual.getFullYear().toString();

    this._provasService.listarProva()
            .then((data: any[]) => {
                
                if(data.length > 9)
                  data = data.sort((a,b) => a.criadoEm < b.criadoEm ? 1 : -1).slice(0, 9);
                
                this.ultimasProvas = data;
                
                
            })
            .catch(data => console.log(data)) 
            
            
    if(!this._appService.serie) {
        this._serieService.obterSerie()
                .then(data => {
                  this._appService.serie = data.nome; 
                  localStorage.setItem('serie', data.nome);               
                })
                .catch(data => console.log(data))
    }            
  }

  getFirstWord(str) {
    let spacePosition = str.indexOf(' ');
    if (spacePosition === -1)
        return str;
    else
        return str.substr(0, spacePosition);
  };

}

export enum EMes {
  "Janeiro" = 1,
  "Fevereiro" = 2,
  "Março" = 3,
  "Abril" = 4,
  "Maio" = 5,
  "Junho" = 6,
  "Julho" = 7,
  "Agosto" = 8,
  "Setembro" = 9,
  "Outubro" = 10,
  "Novembro" = 11,
  "Dezembro" = 12,
}