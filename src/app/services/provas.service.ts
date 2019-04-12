import { Service } from "../models/service.model";
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IProva } from "../interfaces/IProva";
import { IMediaDisciplina } from "../interfaces/IMediaDisciplina";


@Injectable()
export class ProvaService extends Service {
  public questoes = [];
  constructor(private _http: HttpClient, private appService: AppService) {
      super(appService);      
  }

  listarProva() : Promise<IProva[]> {           
    return this._http.get(this.url + 'Prova', this.requestOptions)
                    .toPromise()
                    .then((data:any) => data)                    
  }

  obterProvasPorGrade(id: string) {
    return this._http.get(this.url + 'Prova?grade=' + id, this.requestOptions)
                    .toPromise()
                    .then((data:any) => data)    
  }

  obterProvasMultidisciplinares(id: string) {
    return this._http.get(this.url + 'Prova?multidisciplinar=true', this.requestOptions)
                    .toPromise()
                    .then((data:any) => data)    
  }

  obterProvaPorId(id: string) {
    return this._http.get(this.url + 'Prova/' + id, this.requestOptions)
                .toPromise()
                .then((data:any) => data)    
  }
  

  obterMediaDisciplina(data: IProva[]) : IMediaDisciplina[] {
    let aux: any[] = [];
    let mediaPorDisciplina: IMediaDisciplina[] = [];

    this.appService.listaGrade.forEach((vl, idx) => {    
        let dados = data.filter((a) => {  
          if(a.grade)
            return vl.id == a.grade.id  
        }).length > 0
                        ?  data.filter((a) => {  
                          if(a.grade)
                            return vl.id == a.grade.id  
                        }) 
                        : '';
        if(dados) 
          aux.push(dados);               
    });
   
    aux.forEach((vl, idx) => {
        mediaPorDisciplina.push({
          nome: this.appService.listaGrade.find(a => a.id == vl[0].grade.id).disciplina.nome,
          id: vl[0].grade.id,
          media: (vl.map(x => x.notaFinal).reduce((a, b) => a + b) / vl.map(x => x.notaMaxima).reduce((a, b) => a + b) * 100),
          quantidadeDeProvas: vl.length,
          totalNota:  vl.map(x => x.notaFinal).reduce((a, b) => a + b),
          totalNotaMaxima: vl.map(x => x.notaMaxima).reduce((a, b) => a + b)
        })
    })

    return mediaPorDisciplina;    
  }  

  
}