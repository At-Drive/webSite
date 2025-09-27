import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LOGIN_FORM } from 'src/app/features/all-validation';
import { ValidationService } from 'src/app/features/service-guard/form-validation';
import { SpinnerService } from 'src/app/features/service-guard/spinner.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('a@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private validationService: ValidationService,
    private toaster: ToastrService,
    private spinner: SpinnerService
  ) {}

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}

  submit() {
    this.form.enable();
    if (this.validationService.checkErrors(this.form, LOGIN_FORM)) {
      return;
    }
    let formData = this.form.value;
    this.login(formData);
  }

  login(formData: any) {
    this.authService.login(formData).subscribe(
      (res) => {
        const token = res.token;
        const registeredUser = {
          username: res.user.username,
          phone: res.user.phone,
          id: res.user.id,
          email: res.user.email,
        };
        localStorage.setItem('jwtToken', JSON.stringify({ token }));
        localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
        this.toaster.success('Login successful!', 'Success');

        this.router.navigate(['/product_list']);
      },
      (err) => {
        console.error('Login failed:', err);
        const errorMessage = err.error?.message;
        this.toaster.error(errorMessage, 'Error');
      }
    );
  }

  navigateTo() {
    this.router.navigate(['auth/register']);
  }
}
