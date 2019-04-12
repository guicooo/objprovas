import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProvasComponent } from './list-provas.component';

describe('ListProvasComponent', () => {
  let component: ListProvasComponent;
  let fixture: ComponentFixture<ListProvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
