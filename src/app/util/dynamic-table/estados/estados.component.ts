import { Component, OnInit, Input } from '@angular/core';
import { EstadosService } from 'src/app/services/estados.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {
  @Input() estados: any[];
  @Input() isSemaforo = false;
  estado;
  listEstados: { id: number; name: string; desc: string; icon: string; }[];
  style: any = {};
  constructor(
    private estadosService: EstadosService
  ) {
    this.listEstados = this.estadosService.getEstados();
  }

  ngOnInit(): void {
    const estadoActual = this.estados[this.estados.length - 1];
    this.estado = this.listEstados.find(f => f.id === estadoActual.estado.id_est);
    if (this.isSemaforo) {
      this.style = {
        padding: '5px',
        'border-radius': '50%',
        background: estadoActual.estado.color
      };
    }
  }

}
