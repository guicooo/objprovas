import { Service } from "../models/service.model";
import { AppService } from "./app.service";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ISerie } from "../interfaces/ISerie";

@Injectable()
export class SerieService extends Service {
    
    constructor(private _http: HttpClient, private appService: AppService) {
        super(appService);
    }

    obterSerie() : Promise<ISerie> {
        return this._http.get(this.url + 'Serie', this.requestOptions)
                    .toPromise()
                    .then((data: any) => {
                        this.appService.serie = data;  
                        return  data;                               
                    });      
    }
}