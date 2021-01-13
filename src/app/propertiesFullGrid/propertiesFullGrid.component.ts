import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../_services/properties.service';
import { ActivatedRoute } from '@angular/router';
import { TimeagoIntl } from 'ngx-timeago';

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
}
