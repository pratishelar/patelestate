import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../_services/properties.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  properties: any = [];
  display = "residential";

  constructor(private propertiesService: PropertiesService,) {}

  ngOnInit() {
    this.getResidentialProperty();

  }

  togglePropertyType(mode) {
    this.display = mode;  
  }

  getResidentialProperty(){
    this.propertiesService.getCommercialProperties(10, 0,).subscribe(
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

