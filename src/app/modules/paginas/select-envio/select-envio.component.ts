import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-envio',
  templateUrl: './select-envio.component.html',
  styleUrls: ['./select-envio.component.scss'],
  animations: [
    trigger('ingreso', [
      state('fin', style({
        'padding-top': '0',
        transform: 'scale(1)',
        opacity: '1'
      })),
      state('inicio', style({
        'padding-top': '100px',
        transform: 'scale(0.8)',
        opacity: '0'
      })),
      transition('inicio => fin', animate('500ms ease-in')),
      transition('fin => inicio', animate('500ms ease-out'))
    ]),
    trigger('seleccion', [
      state('hover', style({
        // 'padding-top': '100px',
        transform: 'scale(1.1)'
      })),
      state('out', style({
        // 'padding-top': '0',
        transform: 'scale(1)'
      })),
      transition('out => hover', animate('200ms')),
      transition('hover => out', animate('200ms'))
    ]),
    trigger('seleccion2', [
      state('hover', style({
        // 'padding-top': '100px',
        transform: 'scale(1.1)',
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        '-webkit-box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      })),
      state('out', style({
        // 'padding-top': '0',
        transform: 'scale(1)',
        'box-shadow': '0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 22px 0 rgba(0, 0, 0, 0.19)',
        '-webkit-box-shadow': '0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 22px 0 rgba(0, 0, 0, 0.19)'
      })),
      transition('out => hover', animate('200ms')),
      transition('hover => out', animate('200ms'))
    ])
  ]
})
export class SelectEnvioComponent implements OnInit {
  estadoLogin = 'inicio';
  estadoSpinner = 'inicio';
  isSelected = 'out';
  isSelected2 = 'out';

  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.estadoLogin = 'fin';
    }, 300);
  }

  isHover(key) {
    switch (key) {
      case 1:
        this.isSelected = 'hover';
        break;
      case 2:
        this.isSelected2 = 'hover';
        break;
    }
  }

  isOut(key) {
    switch (key) {
      case 1:
        this.isSelected = 'out';
        break;
      case 2:
        this.isSelected2 = 'out';
        break;
    }
  }

  redireccionar(opcion) {
    switch (opcion) {
      case 1:
        this.router.navigate(['encomienda', 'vista', 'unica']);
        break;
      case 2:
        this.router.navigate(['encomienda', 'vista', 'masiva']);
        break;
    }

  }

}
