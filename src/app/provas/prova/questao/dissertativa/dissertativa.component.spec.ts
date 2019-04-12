import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DissertativaComponent } from './dissertativa.component';

describe('DissertativaComponent', () => {
  let component: DissertativaComponent;
  let fixture: ComponentFixture<DissertativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DissertativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DissertativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
