import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-resolucao',
  templateUrl: './resolucao.component.html',
  styleUrls: ['./resolucao.component.scss']
})
export class ResolucaoComponent implements OnInit {
 
  constructor(public appService: AppService) { }

  ngOnInit() { }

}
