import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  searchFieldText: string;
  availableSystems: string[];
  searchResultList: string[];

  ngOnInit() {
    this.availableSystems = [
      'Unix Account', 'XCom Server', 'XCom Datamart', 'XCom Mobile Interface',
      'ShareBox', 'XCom Mail', 'Issue Tracker'
    ];
  }

  searchFieldTextDidChange(searchString: string) {
    this.searchResultList = [];
    this.availableSystems.forEach(value => {
      if(value.includes(searchString)) {
        this.searchResultList.push(value);
      }
    });
  }

}
