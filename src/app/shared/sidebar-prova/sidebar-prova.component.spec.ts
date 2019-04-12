import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProvaComponent } from './sidebar-prova.component';

describe('SidebarProvaComponent', () => {
  let component: SidebarProvaComponent;
  let fixture: ComponentFixture<SidebarProvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarProvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
