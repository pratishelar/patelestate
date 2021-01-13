import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleProperty',
  templateUrl: './singleProperty.component.html',
  styleUrls: ['./singleProperty.component.css'],
})
export class SinglePropertyComponent implements OnInit {
  property: any;
  selectedIndex: number = 0;
  selectedIndexcarasoul : number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSingleProperty();
  }

  getSingleProperty() {
    this.route.data.subscribe((data) => {
      this.property = data.property;
      console.log(this.property);
    });
  }

   setIndex(index: number) {
      this.selectedIndex = index;
   }

   setIndexcarasoul(index: number) {
    this.selectedIndexcarasoul = index;
 }
}
