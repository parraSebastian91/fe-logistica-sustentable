import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  overlay = {
    background: '#243859',
    color: '#666666',
    position: 'absolute',
    height: '100%',
    width: '100%',
    'z-index': 5000,
    top: 0,
    left: 0,
    float: 'left',
    'text-align': 'center',
    'padding-top': '15%',
    opacity: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
