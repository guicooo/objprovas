import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativaProvaComponent } from './alternativa-prova.component';

describe('AlternativaProvaComponent', () => {
  let component: AlternativaProvaComponent;
  let fixture: ComponentFixture<AlternativaProvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativaProvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativaProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
