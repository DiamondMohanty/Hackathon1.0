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
import { Knowledge } from '../models/knowledge.model';

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

  knowledgeModules: Knowledge[] = [];

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

      // Replace with service call

      let uploadKnowledgeModule: Knowledge = {
        id: 0,
        title: "Upload KT Documents",
        description: "Upload documents here to make it available to all team members",
        views: null,
        url: "uploadKT",
        author: 'System'
      }

      this.knowledgeModules.push(uploadKnowledgeModule);
      let viewKnowledgeModule: Knowledge = {
        id: 0,
        title: "View KT Documents",
        description: "View KT Documents relevant to you. Go through the materials and acquire knowlegde in the go.",
        views: null,
        url: "viewKT",
        author: 'System'
      }
      this.knowledgeModules.push(viewKnowledgeModule);

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
