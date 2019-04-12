import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-card-materia',
  templateUrl: './card-materia.component.html',
  styleUrls: ['./card-materia.component.scss']
})
export class CardMateriaComponent implements OnInit, AfterContentChecked {
  @Input() materiaList;
  @Input() rawMateriasData;  
  public hasMultidisciplinar: boolean = false;
  public arrayMultidisciplinar: any = [];
  public mediaMultidisciplnar: any;
  constructor() { }

  ngOnInit() {
  }


  ngAfterContentChecked() {
    if(this.rawMateriasData) {
      for(let materia of this.rawMateriasData) {
        let firstWord = materia.rotulo.split(' ')[0];
        if(firstWord.toLowerCase().indexOf('multidisciplina') > -1)
          this.hasMultidisciplinar = true;
          this.arrayMultidisciplinar.push(materia);
      }

      for(let materiaMult of this.arrayMultidisciplinar) {        
        this.mediaMultidisciplnar = (this.arrayMultidisciplinar.map(x => x.notaFinal).reduce((a, b) => a + b) / this.arrayMultidisciplinar.map(x => x.notaMaxima).reduce((a, b) => a + b) * 100).toFixed(1);
      }
    }

    
  }

}
