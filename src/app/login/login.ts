import { Component } from '@angular/core';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm!: FormGroup;
  constructor(private cs: Auth, private router: Router, private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.value) {
      this.cs.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            const token = res.token;
            if (token) {
              localStorage.setItem("token", token);
              localStorage.setItem('user', JSON.stringify(res.data));
              this.router.navigateByUrl('/dashboard', {
                replaceUrl: true
              })
            }
          }
        }
      })
    }
  }
}
