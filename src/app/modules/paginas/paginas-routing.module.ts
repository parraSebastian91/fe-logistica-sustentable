import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioEncomiendaComponent } from './formulario-encomienda/formulario-encomienda.component';
import { FormularioEncomiendaMasivoComponent } from './formulario-encomienda-masivo/formulario-encomienda-masivo.component';
import { LayoutComponent } from './layout/layout.component';
import { SelectEnvioComponent } from './select-envio/select-envio.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { PagosComponent } from './pagos/pagos.component';
import { MoEditPagoComponent } from './pagos/mo-edit-pago/mo-edit-pago.component';


const routes: Routes = [
  {
    path: 'vista',
    component: LayoutComponent,
    children: [
      {
        path: 'unica',
        component: FormularioEncomiendaComponent,
      },
      {
        path: 'masiva',
        component: FormularioEncomiendaMasivoComponent,
      },
      {
        path: 'ordenes',
        component: OrdenesComponent,
      },
      {
        path: 'pagos',
        component: PagosComponent,
      },
      {
        path: 'gestion',
        loadChildren: () => import('src/app/modules/gestion/gestion.module').then(m => m.GestionModule),
      },
      {
        path: 'mantenedor',
        loadChildren: () => import('src/app/modules/mantenedor/mantenedor.module').then(m => m.MantenedorModule),
      },
    ],
  },
  {
    path: 'mo-edit-pago',
    component: MoEditPagoComponent
  },
  {
    path: 'seleccion-vista',
    component: SelectEnvioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
