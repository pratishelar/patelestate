import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PropertiesService } from '../_services/properties.service';

@Injectable()
export class PropertiesResolver implements Resolve<any> {

  constructor(private propertyservice: PropertiesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.propertyservice
      .getProperties()
      .pipe(
        catchError((error) => {
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }
}
