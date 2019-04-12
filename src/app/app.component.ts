import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from './services/app.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  mostrarMenu: boolean = false;
  mostrarSidebar: boolean = false;
  mostrarFooter: boolean = false;

  sidebar;

  constructor(private _router: Router, public appService : AppService, private _usuarioService: UsuarioService) {
    this._router.events.filter((event: any) => event instanceof NavigationEnd)
    .subscribe(event => {
        this.sidebar = event.url.indexOf('/prova/') > -1 ?  true : false;
        if(event.url.toString().toLowerCase().indexOf('/login') > -1 || event.url.toString().toLowerCase() == '/')
        {
          this.mostrarSidebar = false;
          this.mostrarMenu = false;
        }           
        else
        {
          this.mostrarSidebar = true;
          this.mostrarMenu = true;
        }
        
        // if(event.url.indexOf('/prova/') > -1 && this.appService.colContent == true)
        // {
        //   setTimeout(function(){  
        //     $( ".col-side" ).addClass('col-sidebar');
        //     $( ".col-cont" ).addClass('col-content');
        //   }, 1000)

        // }else
        // {
        //   $( ".col-side" ).removeClass('col-sidebar');
        //   $( ".col-cont" ).removeClass('col-content');
        // }

        // if(event.url.indexOf('/prova/') > -1)
        // {
        //   setTimeout(function(){ 
        //     $( ".col-side" ).addClass('col-sidebar');
        //     $( ".col-cont" ).addClass('col-content');
        //    }, 1000);

        // }else
        // {
        //   $( ".col-side" ).removeClass('col-sidebar');
        //   $( ".col-cont" ).removeClass('col-content');
        // }        
    });
}

}
