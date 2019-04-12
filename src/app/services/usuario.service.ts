import { Injectable } from "@angular/core";
import { Service } from "../models/service.model";
import { AppService } from "./app.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UsuarioService extends Service {

    constructor(private _http: HttpClient, private appService: AppService, private _router: Router) {
        super(appService);      
    }

    obterInformacoes() : Observable<any> {
        return this._http.get(`${this.url}MinhaConta`, this.requestOptionsUpdated())
    }

}