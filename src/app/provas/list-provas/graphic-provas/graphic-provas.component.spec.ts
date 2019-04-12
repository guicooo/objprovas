import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicProvasComponent } from './graphic-provas.component';

describe('GraphicProvasComponent', () => {
  let component: GraphicProvasComponent;
  let fixture: ComponentFixture<GraphicProvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicProvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicProvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
