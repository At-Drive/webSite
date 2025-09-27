import { Component, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationService } from './../../../service-guard/form-validation';
import { REGISTER_FORM } from 'src/app/features/all-validation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('abc', [Validators.required]),
    phone: new FormControl('8989898989', [
      Validators.required,
      Validators.pattern('^[7-9][0-9]{9}$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl('a@gmail.com', [Validators.required, Validators.email]),
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
  ) {}

  ngOnInit() {}

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigateTo() {
    this.router.navigate(['/auth/login']);
  }
  submit() {
    this.form.enable;
    if (this.validationService.checkErrors(this.form, REGISTER_FORM)) {
      return;
    }
     let formData = this.form.value;
    this.create(formData);
  }

  create(formData: any) {
    this.authService.create(formData).subscribe(
      (success) => {
        this.toaster.success(success.message);
        localStorage.setItem('registeredUser', JSON.stringify(success.user));
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.error('Register failed:', err);
        const errorMessage = err.error?.message;
        this.toaster.error(errorMessage, 'Error');
      }
    );
  }
}
