import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucaoComponent } from './resolucao.component';

describe('ResolucaoComponent', () => {
  let component: ResolucaoComponent;
  let fixture: ComponentFixture<ResolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
