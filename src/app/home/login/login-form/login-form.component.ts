import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Md5Service } from '../../../services/md5.service';
import { AppService } from '../../../services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [ LoginService ]
})
export class LoginFormComponent implements OnInit {

  public formLogin = new FormGroup({
    login: new FormControl(null, Validators.required),
    senha: new FormControl(null, Validators.required),
    origem: new FormControl(null, Validators.required)
  });
  public disabled = false;
  public mostrarForm = true;
  public token = '';
  constructor(
    private _loginService: LoginService, 
    private _appService: AppService, 
    private _md5Service: Md5Service,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastr: ToastsManager,
    private _vcr: ViewContainerRef       
  ) {  this._toastr.setRootViewContainerRef(this._vcr);  }

  ngOnInit() {    
    this.token = this.verificarToken();
    if(this.token) {      
      this.disabled = true;
      this.mostrarForm = false;

      this._loginService.autenticarViaToken(this.token)
                .subscribe((data) => {
                  this._toastr.success('Token válido');
                  this._appService.token = data.resultado;
                  localStorage.setItem('token', data.resultado);                 
                  this._router.navigate(['home']);                                             
                },
                (xhr) => {                  
                  this.disabled = false;
                  this.mostrarForm = true;
                  
                  if(xhr.error.notificacoes) {

                    for(let item of xhr.error.notificacoes)
                      this._toastr.error(item.mensagem);

                  } else {                    
                    this._toastr.error('Ocorreu um erro não esperado ao tentar logar com o token, efetue o login manualmente');
                  }

                });              
    }  

    this.formLogin.controls['login'].setValue('01010024296') 
    this.formLogin.controls['senha'].setValue('2005');
    this.formLogin.controls['origem'].setValue('');
  }

  logar() {    
    if(!this.formLogin.valid)
      return this._toastr.info('Formulário Inválido!');
    
    this.disabled = true;
    this._loginService.autenticar({
      login: this.formLogin.controls.login.value, 
      senha: this.formLogin.controls.senha.value,
      origem: this.formLogin.controls.origem.value
    })
    .then(dados => {
      this._appService.token = dados.token;
      localStorage.setItem('token', dados.token);
      this._router.navigate(['home']);
      this.disabled = false;
    })
    .catch(xhr => {
      this.disabled = false;
      if(xhr.error.notificacoes)
        this._toastr.warning(xhr.error.notificacoes[0].mensagem);
      else
        this._toastr.error('Ocorreu um erro não esperado');
    })
    
  }

  verificarToken() {        
    const token = new RegExp('[\?&]token=([^&#]*)').exec(location.href);           
    return token ? token[1] : '';
  }

}

