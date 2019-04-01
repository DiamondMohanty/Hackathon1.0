import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../services/session.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private session: Session) { }

  @Input() currentUser: User;

  ngOnInit() {
  }

  expireSession() {
    this.session.expire();
  }

}
