import {
  Component,
  OnInit,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PropertiesService } from '../_services/properties.service';
import { ActivatedRoute, Router } from '@angular/router';
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
declare let google: any;

@Component({
  selector: 'app-propertiesFullGrid',
  templateUrl: './propertiesFullGrid.component.html',
  styleUrls: ['./propertiesFullGrid.component.css'],
})
export class PropertiesFullGridComponent implements OnInit {
  @ViewChild('divToScroll') divToScroll: ElementRef;
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
  propertyTypeinput: any = '';
  forSale = '';
  exclusive = '';
  openHouse: any = '';
  forCloser: any = '';
  bed: any = '';
  bath: any = '';
  minPriceInput: any = '';
  maxPriceInput: any = '';
  minSqft: any = '';
  maxSqft: any = '';
  basement: any = '';

  // initial center position for the map
  // lat: number = 53.637115;
  // lng: number = -113.50774;
  lat;
  lng;

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
  address;
  previous;

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
    // {
    //   "featureType": "landscape.natural",
    //   "elementType": "geometry",
    //   "stylers": [
    //     {
    //       "color": "#ebfcfc"
    //     }
    //   ]
    // },
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

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    public breakpointObserver: BreakpointObserver,
    private router: Router
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
    if (Object.keys(this.message).length != 0) {
      this.propertysearchinput = this.message.propertysearchinput;
      this.propertyTypeinput = this.message.propertyTypeinput;
      this.minPriceInput = this.message.minPriceInput;
      this.maxPriceInput = this.message.maxPriceInput;
      this.search();
      this.propertiesService.clearOption();
    }
  }

  /*****  find current location from browser  *******/
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        // this.lat = 51.0447;
        // this.lng = -114.0719;

        this.getAddress(this.lat, this.lng);
      });
    }
  }

  /*****  Get current city using current location lat and lng *******/
  getAddress(lat: number, lng: number) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0].formatted_address;
          //let rsltAdrComponent = result.address_components;
          //let resultLength = rsltAdrComponent.length;
          if (result != null) {
            var value = result.split(',');
            var count = value.length;
            var country = value[count - 1];
            var state = value[count - 2];
            var city = value[count - 3];
            this.propertysearchinput = city;
            if (city) this.sortSearchPagination();

            console.log('city name is: ' + city);
            this.address = result;
            // console.log(this.address);
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  /*****  Get map pins *******/
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
            photoPath: element.photoPath,
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

  /***** search sort and pagination api call *******/
  sortSearchPagination() {
    if (this.router.url == '/properties/CommercialProperties') {
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
            // map marker start
            this.markers = [];
            properties.body.forEach((element, index) => {
              const obj = {
                lat: element.latitude,
                lng: element.longitude,
                label: index,
                draggable: false,
                propertyUniqid: element.propertyUniqid,
                address: element.address,
                city: element.city,
                photoPath: element.photoPath,
                price: element.price,
              };
              this.markers.push(obj);
            });
            // map marker end
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.router.url == '/properties/ResidentialProperties') {
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
          this.maxSqft,
          this.forCloser,
          this.basement
        )
        .subscribe(
          (properties: any) => {
            this.properties = properties.body;
            // map marker start
            if (properties.body) {
              this.markers = [];
              properties.body.forEach((element, index) => {
                const obj = {
                  lat: element.latitude,
                  lng: element.longitude,
                  label: index,
                  draggable: false,
                  propertyUniqid: element.propertyUniqid,
                  address: element.address,
                  city: element.city,
                  photoPath: element.photoPath,
                  price: element.price,
                };
                this.markers.push(obj);
              });
            }
            // map marker end
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  getpropertiesFromroute() {
    this.route.data.subscribe((data) => {
      this.propertysearchinput = '';
      this.propertyTypeinput = '';
      this.minPriceInput = '';
      this.maxPriceInput = '';
      this.exclusive = '';
      this.forSale = '';
      this.openHouse = '';
      this.minSqft = '';
      this.maxSqft = '';
      this.openHouse = '';
      this.basement = '';
      this.forCloser = '';
      this.bath = null;
      this.bed = null;
      // this.properties = [];
      this.properties = data['properties'].body;
      
      // this.markers = [];
      console.log(this.properties);
      if (this.router.url == '/properties/CommercialProperties') {
        this.isShown = false;
        this.propertyType = 'Commercial';
        this.setCurrentLocation();
      } else if (this.router.url == '/properties/ResidentialProperties') {
        // this.getMapPins();
        this.isShown = false;
        this.propertyType = 'Residential';
        this.setCurrentLocation();
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

  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  forCloserClick() {
    this.skip = 0;
    this.forCloser = !this.forCloser;
    this.sortSearchPagination();
  }

  basementClick() {
    this.skip = 0;
    this.basement = !this.forCloser;
    this.sortSearchPagination();
  }

  pricechange(event) {
    this.skip = 0;
    console.log('Max', this.maxPriceInput);
    this.sortSearchPagination();
  }

  onSearchChange() {
    this.skip = 0;
    this.sortSearchPagination();
  }

  propertyTypeclick() {
    this.skip = 0;
    //  console.log( this.propertyTypeinput);
    // this.propertyTypeinput = type;
    this.sortSearchPagination();
  }

  forsaleclick(event) {
    this.skip = 0;
    this.forSale = event;
    this.sortSearchPagination();
  }

  exclusiveclick(event) {
    this.skip = 0;
    this.exclusive = event;
    this.sortSearchPagination();
  }

  openhouseclick(event) {
    this.skip = 0;
    this.openHouse = !this.openHouse;
    this.sortSearchPagination();
  }

  bedclick(event) {
    this.skip = 0;
    this.bed = event;
    this.sortSearchPagination();
  }

  bathclick(event) {
    this.skip = 0;
    this.bath = event;
    this.sortSearchPagination();
  }

  changesqft() {
    this.skip = 0;
    this.sortSearchPagination();
  }

  clearFilter() {
    if (
      this.propertysearchinput ||
      this.propertyTypeinput ||
      this.minPriceInput ||
      this.maxPriceInput ||
      this.exclusive ||
      this.forSale ||
      this.openHouse ||
      this.minSqft ||
      this.maxSqft ||
      this.openHouse ||
      this.basement ||
      this.forCloser ||
      this.bath ||
      this.bed
    ) {
      this.propertysearchinput = '';
      this.propertyTypeinput = '';
      this.minPriceInput = '';
      this.maxPriceInput = '';
      this.exclusive = '';
      this.forSale = '';
      this.openHouse = '';
      this.minSqft = '';
      this.maxSqft = '';
      this.openHouse = '';
      this.basement = '';
      this.forCloser = '';
      this.bath = null;
      this.bed = null;

      this.sortSearchPagination();
    }
  }

  toggleShowMap() {
    this.isShown = !this.isShown;
  }

  changeDisplay(mode: number): void {
    this.display = mode;
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
    //console.log(center.lat(), center.lng());
    // this.getAddress(center.lat(), center.lng());
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
    // window.scrollTo(0, 0);
    this.divToScroll.nativeElement.scrollTo(0, 0);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
