import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-provas',
  templateUrl: './card-provas.component.html',
  styleUrls: ['./card-provas.component.scss']
})
export class CardProvasComponent implements OnInit {
  @Input() provas;
  constructor() { }

  ngOnInit() {
  }

}
