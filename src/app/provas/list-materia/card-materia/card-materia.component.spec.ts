import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMateriaComponent } from './card-materia.component';

describe('CardMateriaComponent', () => {
  let component: CardMateriaComponent;
  let fixture: ComponentFixture<CardMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
