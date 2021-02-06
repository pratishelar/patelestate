import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../_services/properties.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  properties: any = [];
  display = 'commercial';

  propertysearchinput = '';
  propertyTypeinput = '';
  minPriceInput = '';
  maxPriceInput = '';

  message: any;
  subscription: Subscription;

  constructor(
    private propertiesService: PropertiesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCommercialProperty();
  }

  ngOnDestroy() {}

  setfilterPropertyforService() {
    this.propertiesService.setOption(
      'propertysearchinput',
      this.propertysearchinput
    );
    this.propertiesService.setOption(
      'propertyTypeinput',
      this.propertyTypeinput
    );
    this.propertiesService.setOption('minPriceInput', this.minPriceInput);
    this.propertiesService.setOption('maxPriceInput', this.maxPriceInput);
  }

  commercial(input?) {
    this.setfilterPropertyforService();

    if(input)
    this.propertiesService.setOption('propertyTypeinput',input);

    this.router.navigateByUrl('/properties/CommercialProperties');
   
  }

  residential(input?) {
    this.setfilterPropertyforService();

    if(input)
    this.propertiesService.setOption('propertyTypeinput',input);

    this.router.navigateByUrl('/properties/ResidentialProperties');
  }

  Popularcommercial(input?) {
    this.setfilterPropertyforService();

    if(input)
    this.propertiesService.setOption('propertysearchinput',input);

    this.router.navigateByUrl('/properties/CommercialProperties');
    
  }

  togglePropertyType(mode) {
    this.display = mode;
  }

  getCommercialProperty() {
    this.propertiesService.getCommercialProperties("6", "3", "", "", "", "", "", "true").subscribe(
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
