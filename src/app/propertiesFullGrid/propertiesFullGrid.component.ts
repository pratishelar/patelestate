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
export class PropertiesFullGridComponent implements OnInit {
  properties: any = [];
  modalRef: BsModalRef;
  isShown: boolean;
  markers: any[] = [];
  currentPage = 4;
  page: number;
  public display: number = 1;
  // google maps zoom level
  zoom: number = 7;
  icon = {
    url: '../assets/images/pin.png',
    scaledSize: { height: 40, width: 30 },
  };
  propertyType: any;
  singleProperty: any;

  // initial center position for the map
  lat: number = 53.637115;
  lng: number = -113.50774;

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getpropertiesFromroute();
    this.getMapPins();
  }

  getMapPins() {
    this.propertiesService.getResidentialMap().subscribe(
      (property: any) => {
        //this.MapPins = property;
        this.markers = [];
        property.body.forEach((element, index) => {
          const obj = {
            lat: element.latitude,
            lng: element.longitude,
            label: index,
            draggable: false,
            propertyUniqid: element.propertyUniqid,
            address: element.address,
            city: element.city,
            photoLink: element.photoLink,
            price: element.price,
          };
          this.markers.push(obj);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleShowMap() {
    this.isShown = !this.isShown;
  }

  changeDisplay(mode: number): void {
    this.display = mode;
  }

  getpropertiesFromroute() {
    this.route.data.subscribe((data) => {
      this.properties = data['properties'].body;

      if (this.properties[0].lat == 0) {
        this.isShown = false;
        this.propertyType = 'Commercial';
      } else {
        this.isShown = true;
        this.propertyType = 'Residential';
      }
    });
  }

  pageChanged(event: any): void {
    this.page = event.page;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
    });
  }


  mouseOver(i: number) {
    // m.icon = '../assets/images/pin3.png';
    this.markers[i].display = true;
  }

  idle($event: any) {
    console.log($event);
  }

  Sort(SortType) {
    if (this.propertyType == 'Commercial') {
      this.propertiesService.getCommercialProperties(10, 0, SortType).subscribe(
        (properties: any) => {
          this.properties = properties.body;
          console.log(properties);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.propertyType == 'Residential') {
      this.propertiesService
        .getResidentialProperties(10, 0, SortType)
        .subscribe(
          (properties: any) => {
            this.properties = properties.body;
            console.log(properties);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
