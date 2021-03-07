import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  showMyContainer;
  public lat;
  public lng;

  // constructor(
  //   private loadingService: LoadingBarService,
  // ) { }

  public ngOnInit(): void {
    this.getLocation();
  }

  onActivate(event) {
    window.scroll(0, 0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
  

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          }
        },
        (error: PositionError) => console.log(error),
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }


}
