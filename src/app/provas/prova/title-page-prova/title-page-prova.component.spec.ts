import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePageProvaComponent } from './title-page-prova.component';

describe('TitlePageProvaComponent', () => {
  let component: TitlePageProvaComponent;
  let fixture: ComponentFixture<TitlePageProvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlePageProvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePageProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
