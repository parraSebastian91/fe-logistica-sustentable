import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {
  @Input() customTemplate: TemplateRef<any>;
  @Input() icono;
  @Input() titulo;
  @Input() color;
  @Input() colorLetra;

  colores;
  icon;
  constructor() { }

  ngOnInit() {
    let colorHex = '';
    let letraColorHex = '';
    const primario = 100;
    const secundario = 75;
    const terceario = 50;
    const opLetra = 100;
    switch (this.color) {
      case 'azul':
        colorHex = '#00138F';
        letraColorHex = '#ffffff';
        this.colores = {
          primario: this.convertHex(colorHex, primario),
          secundario: this.convertHex(colorHex, secundario),
          terceario: this.convertHex(colorHex, terceario),
          letra: this.convertHex(letraColorHex, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(letraColorHex, opLetra)
          }
        };
        break;
      case 'verde':
        colorHex = '#005F01';
        letraColorHex = '#ffffff';
        this.colores = {
          primario: this.convertHex(colorHex, primario),
          secundario: this.convertHex(colorHex, secundario),
          terceario: this.convertHex(colorHex, terceario),
          letra: this.convertHex(letraColorHex, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(letraColorHex, opLetra)
          }
        };
        break;
      case 'rojo':
        colorHex = '#B40000';
        letraColorHex = '#ffffff';
        this.colores = {
          primario: this.convertHex(colorHex, primario),
          secundario: this.convertHex(colorHex, secundario),
          terceario: this.convertHex(colorHex, terceario),
          letra: this.convertHex(letraColorHex, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(letraColorHex, opLetra)
          }
        };
        break;
      case 'amarillo':
        colorHex = '#DBDF00';
        letraColorHex = '#ffffff';
        this.colores = {
          primario: this.convertHex(colorHex, primario),
          secundario: this.convertHex(colorHex, secundario),
          terceario: this.convertHex(colorHex, terceario),
          letra: this.convertHex(letraColorHex, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(letraColorHex, opLetra)
          }
        };
        break;
      case 'blanco':
        colorHex = '#ffffff';
        letraColorHex = '#000000';
        this.colores = {
          primario: this.convertHex(colorHex, primario),
          secundario: this.convertHex(colorHex, secundario),
          terceario: this.convertHex(colorHex, terceario),
          letra: this.convertHex(letraColorHex, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(letraColorHex, opLetra)
          }
        };
        break;
      case undefined:
        colorHex = '#2C3E50 ';
        letraColorHex = '#000000';
        this.colores = {
          primario: this.convertHex(colorHex, 0),
          secundario: this.convertHex(colorHex, 0),
          terceario: this.convertHex(colorHex, 0),
          letra: this.convertHex(letraColorHex, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(letraColorHex, opLetra)
          }
        };
        break;
      default:
        this.colores = {
          primario: this.convertHex(this.color, primario),
          secundario: this.convertHex(this.color, secundario),
          terceario: this.convertHex(this.color, terceario),
          letra: this.convertHex(this.colorLetra, opLetra),
          border: {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': this.convertHex(this.colorLetra, opLetra)
          }
        };
        break;
    }

    if (this.icono === '' || this.icono === undefined) {
      this.colores.border.radius = '10px';
      this.icon = faQuestionCircle;
    } else {
      this.icon = this.icono;
    }
  }

  convertHex(hex, opacity) {
    if (!hex) { hex = ''; }
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
  }

}
