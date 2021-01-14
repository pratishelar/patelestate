import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // google maps zoom level
  zoom: number = 8;
  icon = { url: '../assets/images/pin.png', scaledSize: {height: 40, width: 30}}

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mouseOver(m: any, i: number) {
    // m.icon = '../assets/images/pin3.png';
  }

  markers: any[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: false,
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: false,
    },
  ];
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
