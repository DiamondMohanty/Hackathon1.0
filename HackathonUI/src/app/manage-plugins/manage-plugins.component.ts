import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { ModuleData } from '../models/module.model';

// RxJS
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Session } from '../services/session.service';
import { User } from '../models/user.model';
import { Router, Route } from '@angular/router';
import { RouterService } from '../services/router.service';
import { CommonService } from '../services/common.service';

@Component({
  templateUrl: './manage-plugins.component.html',
  styleUrls: ['./manage-plugins.component.css']
})
export class ManagePluginsComponent implements OnInit {

  installedModules$: any;
  errorMessage: string;
  errorVisible = false;
  currentUser: User;
  constructor(
    private routerService: RouterService, 
    private moduleService: ModuleService,
    private session: Session,
    private router: Router,
    private commonService: CommonService
    ) {
  }

  ngOnInit() {

    this.currentUser = this.session.getSessionUser();

      if (this.currentUser == undefined) {
        this.router.navigateByUrl('');
      }
      
      this.moduleService.loadModulesForManage(this.currentUser).subscribe(res => this.installedModules$ = res);

  }

  enableModule(moduleToModify: ModuleData) {
    // enable or disable module
    /*if(this.isRegistered(moduleToEnable)) {
        this.routerService.unRegisterRoute(moduleToEnable.path);
    } else {
        this.registerRoute(moduleToEnable);
    }*/

    let addOrRemove = ""
    if (moduleToModify.registered == false) {
      addOrRemove = "A"
    } else {
      addOrRemove = "D"
    }

    this.commonService.addRemoveModule(moduleToModify.moduleId, this.currentUser.userId, addOrRemove).subscribe(_ => {
        this.moduleService.loadModulesForManage(this.currentUser).subscribe(res => this.installedModules$ = res)
    });

  }

  isRegistered(moduleData: ModuleData): boolean {
    return this.routerService.routeIsRegistered(moduleData.path);
  }

  private registerRoute(moduleToEnable: ModuleData){
      // load up the umd file and register the route whenever succeeded.
      this.moduleService.loadModuleSystemJS(moduleToEnable).then((exports) => {
        this.routerService.createAndRegisterRoute(moduleToEnable, exports);
      }, (err) => this.showError(`${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`, err));
  }

  private showError(message: string, err) {
      this.errorMessage = message;
      this.errorVisible = true;
      console.log(err); // Log error in console
  }

  closeError() {
    this.errorVisible = false;
  }

}
