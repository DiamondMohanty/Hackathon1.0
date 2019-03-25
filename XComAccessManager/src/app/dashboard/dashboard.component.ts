import { Component, OnInit } from '@angular/core';
import { Access } from './access.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  availableAccess: Access[];

  constructor() { }

  ngOnInit() {
    this.availableAccess = [];
    let aAccess: Access = {
      accessName: 'Unix Login',
      accessDesc: 'Let you login into internal servers. May required access to project specific servers',
      accessImg: 'unix.png'

    }

    this.availableAccess.push(aAccess);

  }

}
