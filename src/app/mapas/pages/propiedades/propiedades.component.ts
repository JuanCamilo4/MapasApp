import { Component, OnInit } from '@angular/core';

interface Propiedad {
  title: string;
  desc: string;
  center: [number, number];
  color: string;
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})

export class PropiedadesComponent implements OnInit {

  propiedades: Propiedad[] = [];

  constructor() { }

  ngOnInit(): void {
    this.propiedades = JSON.parse(localStorage.getItem('markers')!);
    console.log(this.propiedades);
    
  }

}
