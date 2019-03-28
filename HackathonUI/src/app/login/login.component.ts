import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Session } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private session: Session, private router: Router) { }

  username: string;
  password: string;
  ngOnInit() {
  }

  performLogin() {

    this.loginService.performLoginWithCreds(this.username, this.password).subscribe(res => {
      this.session.setSession(res);
      this.router.navigateByUrl('/dashboard');
    });

  }

}
