import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ UsuarioService ]
})
export class HeaderComponent implements OnInit {

  public nomeDoUsuario =  '';
  constructor(private _appService: AppService, 
              private _router: Router, 
              private _usuarioService: UsuarioService ) { }
  
  ngOnInit() {
    // if(this._router.url == '/') return;
    this.loadItems();

    this._router.events.subscribe((val) => {
      $('body').removeClass();

      if (val instanceof NavigationEnd && !this.nomeDoUsuario) {
        this.loadItems();        
      }
    });
    
  }

  loadItems() {
    this._usuarioService.obterInformacoes()
      .subscribe((dados) => {
          this.nomeDoUsuario = dados.nome;
          this._appService.nomeDoAluno = this.nomeDoUsuario;
          
        if(dados.notificacoes)
          for(let notificacao of dados.notificacoes) {
            if(notificacao.tipo == 'Erro') {
              // encerra sessão
              this.sair();
            }
          }
      },
      () => { })
  }

  sair() {
    this._appService.token = '';
    this._appService.listaGrade = [];
    this._appService.serie = '';

    localStorage.setItem('grade', '');
    localStorage.setItem('serie', '');
    localStorage.setItem('token', '');

    this._router.navigate(['login']);
  }
}
