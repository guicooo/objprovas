import { Component, OnInit } from '@angular/core';
import { ProvaService } from '../../services/provas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-list-materia',
  templateUrl: './list-materia.component.html',
  styleUrls: ['./list-materia.component.scss'],
  providers: [ ProvaService ]
})
export class ListMateriaComponent implements OnInit {

  public materias: any[] = [];
  public rawData: any;
  public serie = this._appService.serie;  

  constructor(
    private _provaService : ProvaService,
    private _appService: AppService,   
    public route: ActivatedRoute,
    private _router: Router
  ) { 

    if(this.serie.indexOf('.') == -1) {
      let ano = this._appService.serie.split('º');
      if(ano.length > 1)
        this.serie = ano[0] + '.' + 'º' + ano[1];   
      else {
        let ano = this._appService.serie.split('ª');     
        if(ano.length > 1)
          this.serie = ano[0] + '.' + 'ª' + ano[1];         
      } 
    }
    
  }

  ngOnInit() {
    this._provaService.listarProva()
      .then(data => {
          this.rawData = data;
          this.materias = this._provaService.obterMediaDisciplina(data);           
      })    
      .catch(() => this._router.navigate(['/home']));   

  }
}
