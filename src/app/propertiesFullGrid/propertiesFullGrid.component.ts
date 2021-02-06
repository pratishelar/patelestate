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
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { PopoverModule } from 'ngx-smart-popover';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

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
  propertyTypeinput:any = '';
  forSale = '';
  exclusive = '';
  openHouse: any = '';
  bed: number;
  bath: number;
  minPriceInput: any = '';
  maxPriceInput: any = '';
  minSqft:any = '';
  maxSqft:any = '';

  // initial center position for the map
  lat: number = 53.637115;
  lng: number = -113.50774;

  message: any;
  subscription: Subscription;

  config = {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 1000,
    id: 'server',
  };


  protected map: any;

  options: Options = {
    floor: 0,
    ceil: 1000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min:</b> $' + value;
        case LabelType.High:
          return '<b>Max:</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };


  styles = [
    // {
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#f9f9f4"
    //     }
    //   ]
    // },
    // {
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#523735"
    //     }
    //   ]
    // },
    // {
    //   "elementType": "labels.text.stroke",
    //   "stylers": [
    //     {
    //       "color": "#f5f1e6"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "administrative",
    //   "elementType": "geometry.stroke",
    //   "stylers": [
    //     {
    //       "color": "#f9f9f4"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "administrative.land_parcel",
    //   "elementType": "geometry.stroke",
    //   "stylers": [
    //     {
    //       "color": "#f9f9f4"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "administrative.land_parcel",
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#f9f9f4"
    //     }
    //   ]
    // },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f7f9f9"
        }
      ]
    },
    // {
    //   "featureType": "poi",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#99eb98"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "poi",
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#99eb98"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "poi.park",
    //   "elementType": "geometry.fill",
    //   "stylers": [
    //     {
    //       "color": "#99eb98"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "poi.park",
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#99eb98"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#f5f1e6"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road.arterial",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#fdfcf8"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road.highway",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#f8c967"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road.highway",
    //   "elementType": "geometry.stroke",
    //   "stylers": [
    //     {
    //       "color": "#e9bc62"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road.highway.controlled_access",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#e98d58"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road.highway.controlled_access",
    //   "elementType": "geometry.stroke",
    //   "stylers": [
    //     {
    //       "color": "#db8555"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "road.local",
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#806b63"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "transit.line",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#dfd2ae"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "transit.line",
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#8f7d77"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "transit.line",
    //   "elementType": "labels.text.stroke",
    //   "stylers": [
    //     {
    //       "color": "#ebe3cd"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "transit.station",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#dfd2ae"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "water",
    //   "elementType": "geometry.fill",
    //   "stylers": [
    //     {
    //       "color": "#9de2eb"
    //     }
    //   ]
    // },
    // {
    //   "featureType": "water",
    //   "elementType": "labels.text.fill",
    //   "stylers": [
    //     {
    //       "color": "#92998d"
    //     }
    //   ]
    // }
  ];
  previous;

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 900px or over!');
          this.isShown = false;
        } else {
          console.log('Viewport is smaller than 900px!');
          this.isShown = true;
        }
      });
  }

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

  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

  pricechange(event) {
    console.log('Max', this.maxPriceInput);
    this.sortSearchPagination();
  }

  onSearchChange(){
    this.sortSearchPagination();
  }

  propertyTypeclick() {
  //  console.log( this.propertyTypeinput);
    // this.propertyTypeinput = type;
    this.sortSearchPagination();
  }

  forsaleclick(event) {
    this.forSale = event;
    this.sortSearchPagination();
  }

  exclusiveclick(event) {
    this.exclusive = event;
    this.sortSearchPagination();
  }

  openhouseclick(event) {
    this.openHouse = !this.openHouse;
    this.sortSearchPagination();
  }

  bedclick(event) {
    this.bed = event;
    this.sortSearchPagination();
  }

  bathclick(event) {
    this.bath = event;
    this.sortSearchPagination();
  }

  changesqft(){
    this.sortSearchPagination();
  }

  clearFilter() {
    if(this.propertysearchinput || this.propertyTypeinput || this.minPriceInput 
      || this.maxPriceInput || this.exclusive || this.forSale || this.openHouse)
      {
    this.propertysearchinput = '',
      this.propertyTypeinput = '',
      this.minPriceInput = '',
      this.maxPriceInput = '',
      this.exclusive = '',
      this.forSale = '',
      this.openHouse = ''

      this.sortSearchPagination();
      }
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
    // this.markers[i].display = true;
  }
  protected mapReady(map) {
    this.map = map;
  //   if (this.previous) {
  //     this.previous.close();
  // }
  }

  idle($event: any) {
    // console.log(this.lat);
    // console.log(this.lng);
    var center = this.map.getCenter();
    console.log(center.lat(), center.lng());
  }

  centerChange($event: any) {
    // console.log($event);
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
    this.skip = (number - 1) * this.config.itemsPerPage;
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
          this.maxPriceInput,
          this.exclusive,
          this.forSale,
          this.minSqft,
          this.maxSqft
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
          this.maxPriceInput,
          this.exclusive,
          this.forSale,
          this.openHouse,
          this.bed,
          this.bath,
          this.minSqft,
          this.maxSqft
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
