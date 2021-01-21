import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PropertiesService } from '../_services/properties.service';

@Injectable()
export class PropertiesResolver implements Resolve<any> {
  constructor(
    private propertyservice: PropertiesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let propertyType = route.paramMap.get('propertyType');

    if (propertyType == 'CommercialProperties') {
      return this.propertyservice.getCommercialProperties(10,0).pipe(
        catchError((error) => {
          this.router.navigate(['/']);
          return of(null);
        })
      );
    } else if (propertyType == 'ResidentialProperties') {
      return this.propertyservice.getResidentialProperties(10,0).pipe(
        catchError((error) => {
          this.router.navigate(['/']);
          return of(null);
        })
      );
    }

  }
}
