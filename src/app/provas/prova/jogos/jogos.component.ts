import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ProvaService } from '../../../services/provas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AulaService } from '../../../services/aula.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.scss'],
  providers: [ AulaService ]
})
export class JogosComponent implements OnInit {

  public jogo;
  public titulo;  
  constructor(public appService: AppService, private sanitizer: DomSanitizer, private _aulaService: AulaService) { }

  ngOnInit() {    

    this.obterJogo(this.appService.jogos[0])
  }

  obterJogo(idJogo) {
    this._aulaService.obterAula(idJogo).subscribe((data: any) => {
               
        this.jogo = this.sanitizer.bypassSecurityTrustHtml(data.html);       
        this.titulo = data.titulo;
      
    })
  }
}
