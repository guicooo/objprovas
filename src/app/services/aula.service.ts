import { Injectable } from "@angular/core";
import { Service } from "../models/service.model";
import { AppService } from "./app.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AulaService extends Service {

    constructor(private _http: HttpClient, private appService: AppService, private _router: Router) {
        super(appService);      
    }

    listarAula(id: string) {
        return this._http.get(this.url + 'Aula/?questao=' + id, this.requestOptions) 
    }

    obterAula(idConteudo: string) {
        return this._http.get(this.url + 'Aula/' + idConteudo, this.requestOptions) 
    }

}