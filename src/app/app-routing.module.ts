import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { FormularioEncomiendaComponent } from './components/formulario-encomienda/formulario-encomienda.component';
// import { FormularioEncomiendaMasivoComponent } from './components/formulario-encomienda-masivo/formulario-encomienda-masivo.component';
// import { UploadComponent } from './components/util/upload/upload.component';
// import { FiltroComponent } from './components/util/dynamic-table/filtro/filtro.component';
// import { EditarEncomiendaComponent } from './components/formulario-encomienda-masivo/editar-encomienda/editar-encomienda.component';
// import { PuntoRetiroComponent } from './components/util/modals/punto-retiro/punto-retiro.component';
import { AppComponent } from './app.component';
import { AuthModule } from '../app/modules/auth/auth.module';


const routes: Routes = [
  // {
  //   path: 'punto-retiro',
  //   component: PuntoRetiroComponent
  // },
  // {
  //   path: 'encomienda-form',
  //   component: FormularioEncomiendaComponent
  // },
  // {
  //   path: 'encomienda-masivo',
  //   component: FormularioEncomiendaMasivoComponent
  // },
  // {
  //   path: 'edit-encomienda',
  //   component: EditarEncomiendaComponent
  // },
  // {
  //   path: 'filtro-table',
  //   component: FiltroComponent
  // },
  // {
  //   path: 'upload',
  //   component: UploadComponent
  // },
  // {
  //   path: 'auth',
  //   children: [
  //     {
  //       path: 'register',
  //       component: FiltroComponent
  //     },
  //     // {
  //     //   path: 'login',
  //     //   component: LoginComponent
  //     // }
  //   ]
  // },
  {
    path: 'encomienda',
    loadChildren: () => import('src/app/modules/paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
