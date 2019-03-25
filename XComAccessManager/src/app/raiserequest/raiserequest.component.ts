import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './raiserequest.component.html',
  styleUrls: ['./raiserequest.component.css']
})
export class RaiserequestComponent implements OnInit {

  inputSystem: string;
  availableGroups: string[];
  allgroupnames: string[];
  showNetworkGroups = false;
  constructor(private router: ActivatedRoute) { }
  ngOnInit() {
    this.inputSystem = this.router.snapshot.paramMap.get('systemname');
    if(this.inputSystem.includes('Datamart') || this.inputSystem.includes('Server')) {
      this.showNetworkGroups = true;
    }
    this.availableGroups = ['ngdb', 'ngnixdb', 'apachedb', 'idb', 'pricesystems']
  }

  searchFieldTextDidChange(searchString: string) {
    this.allgroupnames = [];
    this.availableGroups.forEach(value => {
      if(value.includes(searchString)) {
        this.allgroupnames.push(value);
      }
    });
  }

}
