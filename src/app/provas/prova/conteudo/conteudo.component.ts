import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ProvaService } from '../../../services/provas.service';
import { AulaService } from '../../../services/aula.service';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
  providers: [ AulaService ]
})
export class ConteudoComponent implements OnInit {

  public conteudo;
  public titulo;
  public mostrar = false;
  constructor(public appService: AppService, private _aulaService: AulaService) { }

  ngOnInit() {
   
    if(this.appService.conteudo.length > 0)   
      this.obterConteudo(this.appService.conteudo[0]);
          
    if(this.appService.conteudo.length > 1) 
      this.mostrar = true;
    
  }

  obterConteudo(idConteudo: string) {   
    this._aulaService.obterAula(idConteudo).subscribe((data: any) => {        
        this.titulo = data.titulo
        this.conteudo = data.html;      
    })
  }


}
