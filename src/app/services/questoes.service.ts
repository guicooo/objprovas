import { Injectable } from "@angular/core";

import { Service } from "../models/service.model";
import { AppService } from "./app.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QuestoesService extends Service {

    constructor(private _http: HttpClient, private appService: AppService, private _router: Router) {
        super(appService);      
    }

    listarQuestoesAlternativas(id: string) {
        return this._http.get(this.url + 'Questao/Alternativa/?prova=' + id, this.requestOptions)                  
    }

    listarQuestoesDiscursivas(id: string) {
        return this._http.get(this.url + 'Questao/Discursiva/?prova=' + id, this.requestOptions)                
    }

    obterQuestaoDiscursiva(id: string) {
        return this._http.get(this.url + 'Questao/Discursiva/' + id, this.requestOptions).toPromise()     
    }

    obterQuestaoAlternativa(id: string) {
        return this._http.get(this.url + 'Questao/Alternativa/' + id, this.requestOptions).toPromise()        
    }

}