import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  ESTADOS = [
    {
      id: 1,
      name: 'Pendiente',
      desc: 'Pendiente de asignación de repartidor.',
      icon: 'assets/icon/estados/waiting.svg'
    },
    {
      id: 2,
      name: 'En Ruta',
      desc: 'Encomienda en ruta a destino.',
      icon: 'assets/icon/estados/inRoute.svg'
    },
    {
      id: 3,
      name: 'Entregado',
      desc: 'Encomienda entregada en destino.',
      icon: 'assets/icon/estados/delivered.svg'
    },
    {
      id: 4,
      name: 'Con Problemas',
      desc: 'Encomienda con problemas.',
      icon: 'assets/icon/estados/error.svg'
    }
  ];

  constructor() { }

  getEstados() {
    return this.ESTADOS;
  }

}
