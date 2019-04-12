import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvaComponent } from './prova/prova.component';
import { ListMateriaComponent } from './list-materia/list-materia.component';
import { ListProvasComponent } from './list-provas/list-provas.component';
import { CardMateriaComponent } from './list-materia/card-materia/card-materia.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { RouterModule } from '@angular/router';
import { CardProvasComponent } from './list-provas/card-provas/card-provas.component';
import { GraphicProvasComponent } from './list-provas/graphic-provas/graphic-provas.component';
import { AlternativeBarComponent } from './prova/alternative-bar/alternative-bar.component';
import { ChartsModule } from 'ng2-charts';
import { ProvaService } from '../services/provas.service';
import { ConteudoComponent } from './prova/conteudo/conteudo.component';
import { VideosComponent } from './prova/videos/videos.component';
import { ExerciciosComponent } from './prova/exercicios/exercicios.component';
import { DetalhesComponent } from './prova/detalhes/detalhes.component';

import { SidebarProvaComponent } from '../shared/sidebar-prova/sidebar-prova.component';
import { EnunciadoComponent } from './prova/questao/enunciado/enunciado.component';
import { CabecalhoComponent } from './prova/questao/cabecalho/cabecalho.component';
import { AlternativaComponent } from './prova/questao/alternativa/alternativa.component';
import { DissertativaComponent } from './prova/questao/dissertativa/dissertativa.component';
import { ResolucaoComponent } from './prova/resolucao/resolucao.component';
import { AlternativaProvaComponent } from './prova/questao/alternativa-prova/alternativa-prova.component';
import { DissertativaProvaComponent } from './prova/questao/dissertativa-prova/dissertativa-prova.component';
import { TitlePageProvaComponent } from './prova/title-page-prova/title-page-prova.component';
import { TextoApoioComponent } from './prova/texto-apoio/texto-apoio.component';
import { JogosComponent } from './prova/jogos/jogos.component';
import { SugestoesComponent } from './prova/exercicios/sugestoes/sugestoes.component';
import { AulaService } from '../services/aula.service';
import { QuestoesService } from '../services/questoes.service';
import { ExerciciosService } from '../services/exercicios.service';
import { IframeComponent } from './prova/videos/iframe/iframe.component';
import { ToolsBarComponent } from './prova/videos/tools-bar/tools-bar.component';
import { SlideComponent } from './prova/videos/slide/slide.component';


@NgModule({
  imports: [
    CommonModule,
    RoundProgressModule,
    RouterModule,
    ChartsModule
  ],
  declarations: [
    ProvaComponent, 
    ListMateriaComponent, 
    ListProvasComponent, 
    CardMateriaComponent, 
    CardProvasComponent, 
    GraphicProvasComponent, 
    AlternativeBarComponent, 
    ConteudoComponent, 
    VideosComponent, 
    ExerciciosComponent, 
    DetalhesComponent,
    EnunciadoComponent, 
    CabecalhoComponent,
    SidebarProvaComponent,
    AlternativaComponent,
    DissertativaComponent,
    ResolucaoComponent,
    AlternativaProvaComponent,
    DissertativaProvaComponent,
    TitlePageProvaComponent,
    TextoApoioComponent,
    JogosComponent,
    SugestoesComponent,
    IframeComponent,   
    ToolsBarComponent,
    SlideComponent
  ],
  providers: [ 
  ],
})
export class ProvasModule { }
