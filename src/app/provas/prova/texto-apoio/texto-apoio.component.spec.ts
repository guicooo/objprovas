import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoApoioComponent } from './texto-apoio.component';

describe('TextoApoioComponent', () => {
  let component: TextoApoioComponent;
  let fixture: ComponentFixture<TextoApoioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoApoioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoApoioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
