import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  constructor() { }

  listUsuarios = [];
  anchoColumna = {
  };

  ngOnInit(): void {
  }

}
