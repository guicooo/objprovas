import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProvaService } from '../../services/provas.service';
import { AppService } from '../../services/app.service';
import { SerieService } from '../../services/serie.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { IProva } from '../../interfaces/IProva';

@Component({
  selector: 'app-list-provas',
  templateUrl: './list-provas.component.html',
  styleUrls: ['./list-provas.component.scss'],
  providers: [ SerieService, ProvaService ]
})
export class ListProvasComponent implements OnInit {
  public provas: IProva[];
  public serie = this._appService.serie;
  public id: string;
  public nomeMateria: string = '';

  constructor(private _appService: AppService, 
    public toastr: ToastsManager, 
    public vcr: ViewContainerRef, 
    private _provaService : ProvaService, 
    private _route: ActivatedRoute,
    private _router: Router) { 

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
    this.toastr.setRootViewContainerRef(vcr);

    this._route.paramMap.subscribe((params: ParamMap) => {      
      this.id = params.get('id');    
      this.provas = [];
      if(this.id == 'multidisciplinar') {
        this._provaService.obterProvasMultidisciplinares(this.id)
          .then(data => {
            this.provas = data;
          })   
          .catch(() => this.toastr.info('Não há provas para esta matéria!'))   
          
        this.nomeMateria = 'Multidisciplinar';
      } else {
        this._provaService.obterProvasPorGrade(this.id)
          .then(data => {
            this.provas = data;
          })   
          .catch(() => this.toastr.info('Não há provas para esta matéria!'))

        this.nomeMateria = this._appService.listaGrade 
          ? this._appService.listaGrade.filter((a) => a.id == this.id).length > 0 
                  ? this._appService.listaGrade.filter((a) => a.id == this.id)[0].disciplina.nome 
                  : <any>this._router.navigate(['/home'])
          : '';
      }
      
      
      
                    
      });        
  }

  ngOnInit() { }

}
