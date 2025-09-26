import { Component, AfterContentInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router) {}

  ngOnInit() {}

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  navigateTo(){
    this.router.navigate(["/auth/login"])
  }
  submit() {
  }
}
