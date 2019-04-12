import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-page-prova',
  templateUrl: './title-page-prova.component.html',
  styleUrls: ['./title-page-prova.component.scss']
})
export class TitlePageProvaComponent implements OnInit {
  @Input() color: string;
  @Input() title: string;
  @Input() hideTrilha : boolean = true;
  @Input() valores;
  @Output() clickEvento = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.title)
  }

  obter(item, event) {       
    $('.ativo').removeClass('ativo');
    $(event.target).addClass('ativo');
    this.clickEvento.emit(item)
  }

}
