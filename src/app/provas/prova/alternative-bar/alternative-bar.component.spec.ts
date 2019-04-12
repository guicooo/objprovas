import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeBarComponent } from './alternative-bar.component';

describe('AlternativeBarComponent', () => {
  let component: AlternativeBarComponent;
  let fixture: ComponentFixture<AlternativeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
