import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dissertativa-prova',
  templateUrl: './dissertativa-prova.component.html',
  styleUrls: ['./dissertativa-prova.component.scss']
})
export class DissertativaProvaComponent implements OnInit {
  @Input() questaoAtiva;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() { }

}
