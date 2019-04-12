import { CanActivate, Router } from "@angular/router";
import { AppService } from "./app.service";
import { Injectable } from "@angular/core";

@Injectable()
export class GuardService implements CanActivate {
   
    constructor(private _appService: AppService, private _router: Router) { }

    canActivate() {     

      if(!this._appService.token)
          this._router.navigate(['login']);

      return this._appService.token ? true : false;
      
    }
  }