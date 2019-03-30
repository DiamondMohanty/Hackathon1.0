import { NgModule } from '@angular/core';
import { DndaComponent } from './dnda.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DndaComponent],
  imports: [
    RouterModule.forChild([
      {
          path: '', pathMatch: 'full', component: DndaComponent
      }
    ])
  ],
  exports: [DndaComponent]
})
export class DndaModule { }
