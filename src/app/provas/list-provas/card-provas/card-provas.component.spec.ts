import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProvasComponent } from './card-provas.component';

describe('CardProvasComponent', () => {
  let component: CardProvasComponent;
  let fixture: ComponentFixture<CardProvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
