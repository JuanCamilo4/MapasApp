import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
  title?: String;
  desc?: String
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  zoomLevel: number = 15;

  center: [number, number] = [-72.47556968235229, 7.907717477017299];

  markers: MarkerColor[] = [];

  form: FormGroup = this.fb.group({
    titulo: [, [Validators.required]],
    descripcion: [, [Validators.required]],
  });

  constructor(private modalService: NgbModal,
              private fb: FormBuilder) { }

  ngAfterViewInit() {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    /*const maker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa)*/

    this.readLocalStorage();
  }

  ngOnInit(): void {
  }

  openModal(content: any){
    this.modalService.open(content);
  }

  addMarker(){
    console.log(this.form.value.titulo, this.form.value.descripcion);
    
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMaker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
    
    this.markers.push({
      color,
      title: this.form.value.titulo,
      desc: this.form.value.descripcion,
      marker: newMaker
    });

    this.saveMarkerLocalStorage();

    newMaker.on('dragend', () => {
      this.saveMarkerLocalStorage();
    })

    this.modalService.dismissAll();
  }

  goMarker(marker: mapboxgl.Marker | undefined) {
    this.mapa.flyTo({
      center: marker!.getLngLat()
    }) 
  }

  saveMarkerLocalStorage(){
    const lngLatArr: MarkerColor[] = [];

    this.markers.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      const title = m.title;
      const desc = m.desc;

      lngLatArr.push({
        color,
        title,
        desc,
        center: [lng, lat]
      })

    });

    localStorage.setItem('markers', JSON.stringify(lngLatArr))
  }
  
  readLocalStorage(){
    if (!localStorage.getItem('markers')) return;
    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('markers')!);
    lngLatArr.forEach( m => {
      const newMaker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.center!)
      .addTo(this.mapa)

      this.markers.push({
        color: m.color,
        title: m.title,
        desc: m.desc,
        marker: newMaker
      })

      newMaker.on('dragend', () => {
        this.saveMarkerLocalStorage();
      })

    });
  }

  deleteMarker(index: number){
    console.log('delete');
    this.markers[index].marker?.remove();
    this.markers.splice(index, 1);
    this.saveMarkerLocalStorage();
  }

}
