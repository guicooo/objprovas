import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginFormComponent } from './home/login/login-form/login-form.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Md5Service } from './services/md5.service';
import { Md5 } from 'ts-md5';
import { AppService } from './services/app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { GuardService } from './services/guard.service';
import { ProvasModule } from './provas/provas.module';
import { ProvasRoutingModule } from './provas/provas.routing.module';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { SafeHtml } from './pipes/safe.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig } from  'ngx-ui-loader';

const cfg:NgxUiLoaderConfig  = {
    "bgsColor": "#ff5c01",
    "bgsOpacity": 1,
    "bgsPosition": "center-center",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 5,
    "fgsColor": "#00ACC1",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "ball-spin-clockwise",
    "gap": 24,        
    "overlayColor": "rgba(0, 0, 0, 0.8)",      
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    SafeHtml,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ChartsModule,
    AppRoutingModule,
    ProvasRoutingModule,
    // NgProgressModule.forRoot(),
    // NgProgressHttpModule,
    ReactiveFormsModule,    
    BrowserAnimationsModule,
    BrowserModule, 
    BrowserAnimationsModule, 
    ProvasModule,
    RouterModule,
    ToastModule.forRoot(),
    NgxUiLoaderModule.forRoot(cfg), 
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),    
  ],
  exports: [],
  providers: [ Md5Service, Md5, AppService, GuardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
