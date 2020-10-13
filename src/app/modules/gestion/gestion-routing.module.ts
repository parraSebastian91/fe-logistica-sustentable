import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncomiendasComponent } from './encomiendas/encomiendas.component';


const routes: Routes = [
  {
    path: 'encomiendas',
    component: EncomiendasComponent
  },
  {
    path: 'encomiendas/:id',
    component: EncomiendasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
