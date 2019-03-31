import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { Session } from './services/session.service';

declare var SystemJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  currentUser: User;
  constructor(private session: Session) {
    
  }

  ngOnInit() {
    this.currentUser = this.session.getSessionUser();
  }

  expireSession() {
    this.session.expire();
  }

}
