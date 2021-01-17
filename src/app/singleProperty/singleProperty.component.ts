import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { PropertiesService } from '../_services/properties.service';

@Component({
  selector: 'app-singleProperty',
  templateUrl: './singleProperty.component.html',
  styleUrls: ['./singleProperty.component.css'],
})
export class SinglePropertyComponent implements OnInit {
  property: any;
  amenities:any = [];
  appliances: any = [];
  properties: any =[];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
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
      draggable: true,
    },
  ];

  constructor(private route: ActivatedRoute,     private propertiesService: PropertiesService,
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
    } else {
      this.property.residentialImages.forEach((element) => {
        (element.small = element.photoPath),
          (element.medium = element.photoPath),
          (element.big = element.photoPath);
      });
      this.galleryImages = this.property.residentialImages;
    }

        this.propertiesService.getProperties().subscribe(
      (properties: any) => {
        this.properties = properties.body;
        console.log(properties);
      },
      (error) => {
        console.log(error);
      }
    );

   
  }
 

  getSingleProperty() {
    this.route.data.subscribe((data) => {
      this.property = data.property;
      this.amenities = this.property.amenities.split(',');
      this.appliances = this.property.appliances.split(',');
      console.log(this.property);
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
