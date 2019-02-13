import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginControlsComponent } from './login-controls.component';

describe('LoginControlsComponent', () => {
  let component: LoginControlsComponent;
  let fixture: ComponentFixture<LoginControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
