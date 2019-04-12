import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnunciadoComponent } from './enunciado.component';

describe('EnunciadoComponent', () => {
  let component: EnunciadoComponent;
  let fixture: ComponentFixture<EnunciadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnunciadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnunciadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
