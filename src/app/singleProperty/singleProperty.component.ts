import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { PropertiesService } from '../_services/properties.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-singleProperty',
  templateUrl: './singleProperty.component.html',
  styleUrls: ['./singleProperty.component.css'],
})
export class SinglePropertyComponent implements OnInit {
  property: any;
  amenities: any = [];
  appliances: any = [];
  properties: any = [];
  residentialPropertyPrices: any = [];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 59.37570263036942;
  lng: number = -110.38690422746896;

  markers: marker[] = [];
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  points = [];
  signatureImage;
  NDFForm;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getSingleProperty();

    this.galleryOptions = [
      {
        width: '650px',
        height: '450px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    if (this.property.commercialImages) {
      this.property.commercialImages.forEach((element) => {
        (element.small = element.photoPath),
          (element.medium = element.photoPath),
          (element.big = element.photoPath);
      });
      this.galleryImages = this.property.commercialImages;
      this.property.type = 'commercial';
    } else if (this.property.residentialImages) {
      this.property.residentialImages.forEach((element) => {
        (element.small = element.photoPath),
          (element.medium = element.photoPath),
          (element.big = element.photoPath);
      });
      this.galleryImages = this.property.residentialImages;
      this.property.type = 'residential';
    } else {
      this.galleryImages = [
        {
          small: '../assets/images/feature-properties/fp-1.jpg',
          medium: '../assets/images/feature-properties/fp-1.jpg',
          big: '../assets/images/feature-properties/fp-1.jpg',
        },
      ];
    }
    this.getsimilarproperty(6, 0);
  }

  makePdf() {
    this.NDFForm ="";
   
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 600;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // console.log(contentDataURL);
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
       this.NDFForm = pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // console.log(NDFForm);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }

  showImage(data) {
    console.log(data);
    this.signatureImage = data;
  }

  deleteImage() {
    console.log("clear");
    this.signatureImage = null;
  }

  getsimilarproperty(top, skip) {
    if (this.property.type == 'residential') {
      this.propertiesService
        .getResidentialProperties(top, skip, '', '', this.property.propertyType)
        .subscribe(
          (properties: any) => {
            this.properties = properties.body;
            console.log(properties);
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.property.type == 'commercial') {
      this.propertiesService
        .getCommercialProperties(top, skip, '', '', this.property.propertyType)
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

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, {
  //     class: 'modal-lg modal-dialog-centered',
  //     ignoreBackdropClick: false,
  //     keyboard: false,
  //   });
    
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg modal-dialog-centered',
    ignoreBackdropClick: false,
    keyboard: false, });
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  getSingleProperty() {
    this.route.data.subscribe((data) => {
      window.scrollTo(0, 0);
      this.property = data.property;
      if (this.property.amenities)
        this.amenities = this.property.amenities.split(',');
      if (this.property.appliances)
        this.appliances = this.property.appliances.split(',');
      (this.lat = this.property.latitude),
        (this.lng = this.property.longitude),
        (this.markers = [
          {
            lat: this.property.latitude,
            lng: this.property.longitude,
            label: '',
            draggable: false,
          },
        ]);
    });
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
