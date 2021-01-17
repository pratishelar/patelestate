import { Component, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { PropertiesService } from '../_services/properties.service';
import { ActivatedRoute } from '@angular/router';
import { TimeagoIntl } from 'ngx-timeago';
import { MouseEvent } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-propertiesFullGrid',
  templateUrl: './propertiesFullGrid.component.html',
  styleUrls: ['./propertiesFullGrid.component.css'],
})
export class PropertiesFullGridComponent implements OnInit  {
  properties: any = [];
  modalRef: BsModalRef;
  isShown: boolean = true;
  markers: any[] = [];

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    
    this.getproperties();
    
  }

  // ngAfterViewInit() {
  //   this.markers = [];
  //   this.getproperties();
   
  // }

  toggleShowMap() {
    this.isShown = !this.isShown;
  }

  getproperties() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.properties = data['properties'].body;
      this.markers = [];
      this.properties.forEach((element, index) => {
        const obj = {
          lat: element.latitude,
          lng: element.longitude,
          label: index,
          draggable: false,
        };
        this.markers.push(obj);
      });
    });



  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }

  // google maps zoom level
  zoom: number = 4;
  icon = {
    url: '../assets/images/pin.png',
    scaledSize: { height: 40, width: 30 },
  };

  // initial center position for the map
  lat: number = 59.37570263036942;
  lng: number = -110.38690422746896;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mouseOver(m: any, i: number) {
    // m.icon = '../assets/images/pin3.png';
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
