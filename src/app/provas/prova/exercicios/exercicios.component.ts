import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ProvaService } from '../../../services/provas.service';
import { ExerciciosService } from '../../../services/exercicios.service';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.scss'],
  providers: [ ExerciciosService ]
})
export class ExerciciosComponent implements OnInit {
  public exercicio;
  public idCorreta = '';
  public titulo = 'Exercícios';
  public mostrar = false;
  public ultimo: boolean = false;
  constructor(public appService: AppService, private _exerciciosService: ExerciciosService) { }
  
  ngOnInit() {
    if(this.appService.exercicios.length > 0)
      this.obterExercicios(this.appService.exercicios[0]);

    if(this.appService.exercicios.length > 1) 
      this.mostrar = true;
              
  }

  obterExercicios(idExercicio: string) {
    
    this._exerciciosService.obterExercicio(idExercicio).subscribe((data: any) => {
        
       
        this.exercicio = data;
        this.exercicio.numero = this.appService.exercicios.indexOf(idExercicio) + 1;  

        this.appService.exercicios.indexOf(idExercicio) + 1 == this.appService.exercicios.length 
                        ? this.ultimo = true 
                        : this.ultimo = false;

        if(!this.ultimo) 
          $('#confirma').css('display', 'inherit');
        

        if(this.exercicio.alternativas.length > 0) {
          this.exercicio.tipo = 'Alternativa';
          this.idCorreta = this.exercicio.alternativas.find(x => x.resposta.toString().toLowerCase() == "true").id;         
        }          
        else
          this.exercicio.tipo = 'Discursiva';
      
    })
  }
}
