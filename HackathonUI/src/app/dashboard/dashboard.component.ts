import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { ModuleService } from '../services/module.service';
import { ModuleData } from '../models/module.model';

// RxJS
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Session } from '../services/session.service';
import { User } from '../models/user.model';
import { Router, Route } from '@angular/router';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  installedModules$: any;
  errorMessage: string;
  errorVisible = false;
  existingRoutes$: Observable<Route[]>;
  currentUser: User;
  constructor(
    private routerService: RouterService, 
    private moduleService: ModuleService,
    private session: Session,
    private router: Router
    ) {
        this.existingRoutes$ = this.routerService.existingRoutes;   
  }

  ngOnInit() {
      
      this.currentUser = this.session.getSessionUser();

      if (this.currentUser == undefined) {
        this.router.navigateByUrl('');
      }

      
      this.moduleService.loadModulesForUser(this.currentUser).subscribe(res =>
        {            
            let allModules = res
            this.installedModules$ = allModules;
            allModules.forEach(x => {
                if(x.registered)
                    this.registerRoute(x);
            })
        });
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

  performModuleChangeTo(path: string) {
    this.router.navigateByUrl(path);
  }

  showAllPlugins() {
    this.router.navigateByUrl('pluginmanager');
  }
}
