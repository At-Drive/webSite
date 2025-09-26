import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo() {
    this.router.navigate(["auth/register"]);
  }
}
