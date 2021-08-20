import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { coordinatesMap } from './coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map(value => marker([value.latitude,value.longitude]));
  }

  @Input()
  initialCoordinates:coordinatesMap[]=[];

  @Output()
  onSelectedLocation = new EventEmitter<coordinatesMap>();


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 18,
        attribution: 'Augular Movies' })
    ],
    zoom: 15,
    center: latLng(13.742797563404501,100.56135892868043)
  };

  layers:Marker<any>[]=[];

  handleMapClick(event:LeafletMouseEvent){
    const latitude :number = event.latlng.lat;
    const longitude :number = event.latlng.lng;

    console.log({latitude,longitude});
    this.layers=[];
    this.layers.push(marker([latitude,longitude]));
    this.onSelectedLocation.emit({latitude,longitude});
  }
  

}
