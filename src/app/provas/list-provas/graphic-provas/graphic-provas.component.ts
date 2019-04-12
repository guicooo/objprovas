import { Component, OnInit, Input } from '@angular/core';
import { IProva } from '../../../interfaces/IProva';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-graphic-provas',
  templateUrl: './graphic-provas.component.html',
  styleUrls: ['./graphic-provas.component.scss']
})
export class GraphicProvasComponent implements OnInit {

  @Input() provas : IProva[];  
  public lineChartData:Array<any> = [
    { data: [0,0,0,0], label: 'Notas' },
  ];
 
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';  

  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(52,140,200,0.2)',
      borderColor: 'rgba(52,140,200,0.4)',
      pointBackgroundColor: 'rgba(219,150,52,0.9)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(219,150,52,0.9)'
    }];

    
  public lineChartLabels: any = [];
  public notaMaxima = 10;
  public lineChartOptions: any = {
    responsive: true,
    scales : { yAxes: [{ ticks: { steps : 10, stepValue : 0, max : this.notaMaxima, } }] }
  };

  constructor(private _router: ActivatedRoute) { }

  ngOnInit() {

    this._router.paramMap.subscribe((params: ParamMap) => {   
      this.provas = [];     
      this.lineChartLabels = [];
      this.lineChartData[0].data = [];
      
      setTimeout(() => {
        
        let newArray = [];
        let newLabels = [];
      
        this.provas.forEach((vl, idx) => {
          newArray.push(vl.notaFinal);      
          newLabels.push(vl.rotulo.length > 8 ? vl.rotulo.slice(0, 8) + "..." : vl.rotulo);
        
          if(vl.notaMaxima > this.notaMaxima)
            this.notaMaxima = vl.notaMaxima;
                              
        });
        
        this.lineChartData[0].data = newArray;   
        this.lineChartLabels = newLabels;
                
      }, 600)       
    });    
  
  }
 
}
