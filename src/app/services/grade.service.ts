import { Service } from "../models/service.model";
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IGrade } from "../interfaces/IGrade";
import { Router } from "@angular/router";
import { IProva } from "../interfaces/IProva";

@Injectable()
export class GradeService extends Service {

  constructor(private _http: HttpClient, private appService: AppService, private _router: Router) {
      super(appService);      
  }

  listarGrade() : Promise<IGrade[]> {           
    return this._http.get(this.url + 'Grade', this.requestOptions)
                    .toPromise()
                    .then((data: any) => {   
                       
                      localStorage.setItem('grade', JSON.stringify(data));
                      this.appService.listaGrade = data;
                     
                      return data;
                    }).catch(() => {                     
                      this._router.navigate(['']);
                    });                    
  }

  ordenarPorGrade(data : IProva[]) : IProva[] {
    data.sort((a, b) => { return a.grade.id > b.grade.id ? 1 : -1 });    
    return data;
  }

}