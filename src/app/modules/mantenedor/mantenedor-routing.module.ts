import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {
    path: 'mi-perfil/:id',
    component: PerfilComponent,
  }, 
  {
    path: 'mi-perfil',
    component: PerfilComponent,
  },
  {
    path: 'lista-usuarios',
    component: ListaUsuariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenedorRoutingModule { }
