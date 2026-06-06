import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginV2 } from './login-v2';

describe('LoginV2', () => {
  let component: LoginV2;
  let fixture: ComponentFixture<LoginV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginV2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
