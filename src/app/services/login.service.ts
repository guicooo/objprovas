import { Service } from "../models/service.model";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppService } from "./app.service";
import { Observable } from "rxjs";

@Injectable()
export class LoginService extends Service {
    
    constructor(private _http: HttpClient, private appService: AppService)  {
        super(appService);
    }

    autenticar(body) : Promise<any> {
       
        return this._http.post(this.url + 'MinhaConta/Autenticacao/Matricula', this.tratarObjeto(body), this.requestOptions)
                        .toPromise()
                        .then(data => data)                        
    }


    autenticarViaToken(token: string) : Observable<any> {
        return this._http.get(this.url + `MinhaConta/Autenticacao/Matricula/Token/CentralSistemas?token=${token}`,this.requestOptions)                        
    }
}