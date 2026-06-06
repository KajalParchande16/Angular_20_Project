import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { ToastrService } from 'ngx-toastr';
type UserRole = 'SuperAdmin' | 'Teacher' | 'Student';
@Component({
  selector: 'app-login-v2',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-v2.html',
  styleUrl: './login-v2.scss'
})
export class LoginV2 {
  cdf = inject(ChangeDetectorRef);
  selectedRole = signal<UserRole>('SuperAdmin');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  // Form payload fields
  credentials = {
    email: '',
    password: '',
    rememberMe: false
  };
  loginForm!: FormGroup;
  constructor(private auth: Auth, private router: Router, private fb: FormBuilder, private toaster: ToastrService) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {
    // console.log(this.isLoading());
    // this.cdf.detectChanges();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 0);
  }
  // selectRole(role: UserRole): void {
  //   this.selectedRole.set(role);
  // }

  togglePasswordVisibility(): void {
    this.showPassword.update(prev => !prev);
  }

  onLoginSubmit(event: Event): void {
    event.preventDefault();

    // 1. Guard check: Stop execution if the user left fields empty or invalid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toaster.error('Please fill in all security credentials correctly.');
      return;
    }

    // 2. Trigger your premium UI loading state widget
    this.isLoading.set(true);

    // 3. Dispatch credentials payload to backend service channel
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        // Turn off loading once server responds
        this.isLoading.set(false);
        if (res.success) {
          this.auth.saveUserDetails(res);
          this.router.navigateByUrl('/layout/dashboard', {
            replaceUrl: true
          });
          // const token = res.token;
          // if (token) {
          //   localStorage.setItem("token", token);
          //   localStorage.setItem('user', JSON.stringify(res.data));

          //   // Clean redirect to dashboard layout shell
          //   this.router.navigateByUrl('/layout/dashboard', {
          //     replaceUrl: true
          //   });
          // }
        } else {
          // Handle failed matching credentials scenarios smoothly
          this.toaster.error(res.message || 'Authentication failed. Access denied.');
        }
      },
      error: (err) => {
        // CRITICAL FIX: Turn off loading state so user can retry typing credentials
        this.isLoading.set(false);
        const serverErrorMessage = err.error?.message || 'A network error occurred during system authentication.';
        this.toaster.error(serverErrorMessage);
      }
    });
  }

}
