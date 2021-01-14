import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../_services/properties.service';
import { ActivatedRoute } from '@angular/router';
import { TimeagoIntl } from 'ngx-timeago';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-propertiesFullGrid',
  templateUrl: './propertiesFullGrid.component.html',
  styleUrls: ['./propertiesFullGrid.component.css'],
})
export class PropertiesFullGridComponent implements OnInit {
  properties: any = [];

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getproperties();
  }

  getproperties() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.properties = data['properties'].body;
    });

    // this.propertiesService.getProperties().subscribe(
    //   (properties: any) => {
    //     this.properties = properties.body;
    //     console.log(properties);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }


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
