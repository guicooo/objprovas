import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-texto-apoio',
  templateUrl: './texto-apoio.component.html',
  styleUrls: ['./texto-apoio.component.scss']
})
export class TextoApoioComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() { }
  
}
