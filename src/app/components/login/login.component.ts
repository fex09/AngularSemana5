import { AuthService } from './../../services/auth/auth.service';
import { Credentials } from './../../models/credenetials';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  crendentials: Credentials;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.crendentials = new Credentials();
  }

  ngOnInit() {
  }

  login(ngForm: NgForm): void {
    if (ngForm.invalid) {
      return;
    }
    this.authService.login(this.crendentials).subscribe(
      response => {
          this.router.navigate(['/home']);
      },
      err => {
        alert(err.message);
      }
    );
  }

}
