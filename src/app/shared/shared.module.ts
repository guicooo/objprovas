import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ProvasRoutingModule } from '../provas/provas.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { UsuarioService } from '../services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProvasRoutingModule,
    HttpClientModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    
  ],
  providers: [
    UsuarioService
  ]
})
export class SharedModule { }
