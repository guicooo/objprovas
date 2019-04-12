import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvaComponent } from './prova/prova.component';
import { ListMateriaComponent } from './list-materia/list-materia.component';
import { ListProvasComponent } from './list-provas/list-provas.component';
import { ExerciciosComponent } from './prova/exercicios/exercicios.component';
import { DetalhesComponent } from './prova/detalhes/detalhes.component';
import { ConteudoComponent } from './prova/conteudo/conteudo.component';
import { VideosComponent } from './prova/videos/videos.component';
import { ResolucaoComponent } from './prova/resolucao/resolucao.component';
import { TextoApoioComponent } from './prova/texto-apoio/texto-apoio.component';
import { JogosComponent } from './prova/jogos/jogos.component';
import { GuardService } from '../services/guard.service';
import { LoginComponent } from '../home/login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';

// import { GuardService } from './services/guard.service';

const appRoutes: Routes = [    
    { path: 'disciplinas', canActivate: [ GuardService ], component: ListMateriaComponent }, 
    { path: 'disciplinas/:id', canActivate: [ GuardService ], component: ListProvasComponent },   
    { path: 'prova', canActivate : [ GuardService ], component: ProvaComponent, children:[
        {path: 'detalhes/:id', component: DetalhesComponent},
        {path: 'conteudo/:id', component: ConteudoComponent},
        {path: 'videos/:id', component: VideosComponent},
        {path: 'exercicios/:id', component: ExerciciosComponent},
        {path: 'resolucao/:id', component: ResolucaoComponent},
        {path: 'apoio/:id', component: TextoApoioComponent},
        {path: 'jogos/:id', component: JogosComponent},        
    ]},   
    

    // canActivate: [AuthGuard], 
    // canActivateChild: [AlunosGuard], 
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [ GuardService ]
})

export class ProvasRoutingModule {
    
}
