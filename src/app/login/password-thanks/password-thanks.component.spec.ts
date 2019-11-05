import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordThanksComponent } from './password-thanks.component';

describe('PasswordThanksComponent', () => {
  let component: PasswordThanksComponent;
  let fixture: ComponentFixture<PasswordThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
