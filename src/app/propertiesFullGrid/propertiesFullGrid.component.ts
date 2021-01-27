import {
  Component,
  OnInit,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { PropertiesService } from '../_services/properties.service';
import { ActivatedRoute } from '@angular/router';
import { TimeagoIntl } from 'ngx-timeago';
import { MouseEvent } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-propertiesFullGrid',
  templateUrl: './propertiesFullGrid.component.html',
  styleUrls: ['./propertiesFullGrid.component.css'],
})
export class PropertiesFullGridComponent implements OnInit, OnDestroy {
  properties: any = [];
  modalRef: BsModalRef;
  isShown: boolean;
  markers: any[] = [];
  currentPage = 1;
  skip = 0;

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

  //sort
  sortType = '';

  // search
  propertysearchinput = '';
  propertyTypeinput = '';
  minPriceInput = '';
  maxPriceInput = '';

  // initial center position for the map
  lat: number = 53.637115;
  lng: number = -113.50774;

  message: any;
  subscription: Subscription;

  config = {
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: 1000,
    id: 'server',
  };

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getpropertiesFromroute();

    this.message = this.propertiesService.getOption();
    console.log(this.message);

    if (Object.keys(this.message).length != 0) {
      this.propertysearchinput = this.message.propertysearchinput;
      this.propertyTypeinput = this.message.propertyTypeinput;
      this.minPriceInput = this.message.minPriceInput;
      this.maxPriceInput = this.message.maxPriceInput;
      this.search();
      this.propertiesService.clearOption();
    }
  }

  ngOnDestroy() {}

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
      // this.properties = [];
      this.properties = data['properties'].body;
      // this.markers = [];
      console.log(this.properties);
      if (this.properties[0].latitude == 0) {
        this.isShown = false;
        this.propertyType = 'Commercial';
      } else if (this.properties[0].latitude != 0) {
        this.getMapPins();
        this.isShown = false;
        this.propertyType = 'Residential';
      }
    });
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
    //console.log($event);
  }

  Sort() {
    this.skip = 0;
    this.sortSearchPagination();
    window.scrollTo(0, 0);
  }

  search() {
    this.skip = 0;
    this.sortSearchPagination();
    window.scrollTo(0, 0);
  }

  onPageChange(number: number) {
    //console.log(`pageChange(${number})`);
    this.skip = (number-1) * this.config.itemsPerPage;
    this.config.currentPage = number;
    this.sortSearchPagination();
    window.scrollTo(0, 0);
  }

  sortSearchPagination() {
    if (this.propertyType == 'Commercial') {
      this.propertiesService
        .getCommercialProperties(
          this.config.itemsPerPage,
          this.skip,
          this.sortType,
          this.propertysearchinput,
          this.propertyTypeinput,
          this.minPriceInput,
          this.maxPriceInput
        )
        .subscribe(
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
        .getResidentialProperties(
          this.config.itemsPerPage,
          this.skip,
          this.sortType,
          this.propertysearchinput,
          this.propertyTypeinput,
          this.minPriceInput,
          this.maxPriceInput
        )
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
