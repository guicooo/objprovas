import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { GuardService } from './services/guard.service';
import { ProvasModule } from './provas/provas.module';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [    
    { path: '', component: LoginComponent },
    { path: 'home', canActivate: [ GuardService ], component: HomeComponent },
    { path: 'login', component: LoginComponent },   
    { path: '**',  component: NotFoundComponent }, 
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}
