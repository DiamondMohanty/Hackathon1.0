import { ModuleService } from './services/module.service';
import { RouterService } from './services/router.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, COMPILER_OPTIONS, CompilerFactory, Compiler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { TagInputModule } from 'ngx-chips';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ManagePluginsComponent } from './manage-plugins/manage-plugins.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UploadKTComponent } from './upload-kt/upload-kt.component';
import { ViewKTComponent } from './view-kt/view-kt.component';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ManagePluginsComponent,
    NavigationComponent,
    UploadKTComponent,
    ViewKTComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule,
    FormsModule,
    TagInputModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'login', pathMatch: 'full',
        
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'pluginmanager', component: ManagePluginsComponent
      },
      {
        path: 'uploadKT', component: UploadKTComponent
      },
      {
        path: 'viewKT', component: ViewKTComponent
      }
    ]),
    HttpModule
  ],
  providers: [RouterService, ModuleService,
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
