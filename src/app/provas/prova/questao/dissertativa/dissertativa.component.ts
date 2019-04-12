import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-dissertativa',
  templateUrl: './dissertativa.component.html',
  styleUrls: ['./dissertativa.component.scss']
})
export class DissertativaComponent implements OnInit {
  @Input() questaoAtiva;
  @Input() ultimo;
  public avancar = false;
  
  constructor(public appService: AppService) { }

  ngOnInit() { }
  avancarClick() {
    if(!this.ultimo)  {
      $('.ativo').next().trigger('click');   
      this.avancar = false;
    }  
      
  }

}
