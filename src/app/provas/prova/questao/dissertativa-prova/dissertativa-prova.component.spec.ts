import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DissertativaProvaComponent } from './dissertativa-prova.component';

describe('DissertativaProvaComponent', () => {
  let component: DissertativaProvaComponent;
  let fixture: ComponentFixture<DissertativaProvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DissertativaProvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DissertativaProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
