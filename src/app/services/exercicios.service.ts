import { Injectable } from "@angular/core";
import { Service } from "../models/service.model";
import { AppService } from "./app.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ExerciciosService extends Service {

    constructor(private _http: HttpClient, private appService: AppService, private _router: Router) {
        super(appService);      
    }
      
    listarExercicios(id: string) {
        return this._http.get(this.url + 'Exercicio/?questao=' + id + '&vinculado=true', this.requestOptions) 
    }
   
    obterExercicio(idExercicio: string) {
        return this._http.get(this.url + 'Exercicio/' + idExercicio, this.requestOptions) 
    }
}