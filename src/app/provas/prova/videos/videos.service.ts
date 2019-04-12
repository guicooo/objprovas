import { Service } from "../../../models/service.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "../../../services/app.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class VideoService  extends Service {
    constructor(private _http: HttpClient, private appService: AppService, private _router: Router) {
        super(appService);      
    }

    obterVideo(midia: string) {
       // this.requestOptions.headers.append('chavePublica', '32D69BD2-9E51-4199-AD01-7C6758DC0C8C')
       // http://200.196.224.211/video/tvweb/objetivo/colegio/ead/auladigital/bandalarga/150220_josegambera_geografia_i_9ano_ad.ism/manifest
        return this._http.get(`${this.url}Video?id=${midia}`, this.requestOptions)
    }
}