import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiserequestComponent } from './raiserequest/raiserequest.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'raiserequest/:systemname', component: RaiserequestComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
