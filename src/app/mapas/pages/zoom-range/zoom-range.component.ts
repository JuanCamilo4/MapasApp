import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  zoomLevel: number = 10;

  center: [number, number] = [-72.47556968235229, 7.907717477017299];

  constructor() { }

  ngOnDestroy() {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void { 
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', () => this.zoomLevel = this.mapa.getZoom());

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat]
    });

  }

  zoomIn() {
    console.log('In')
    this.mapa.zoomIn();
  }

  zoomOut() {
    console.log('Out')
    this.mapa.zoomOut();
  }

  zoomCambio(input: string){
    this.mapa.zoomTo(parseInt(input))
    
  }

}
