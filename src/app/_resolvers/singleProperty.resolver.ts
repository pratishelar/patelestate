import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertiesService } from '../_services/properties.service';

@Injectable({
  providedIn: 'root',
})
export class SinglePropertyResolver implements Resolve<any> {
  constructor(private memberService: PropertiesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let propertyType = route.paramMap.get('propertyType');

    if (propertyType == 'CommercialProperties') {
      return this.memberService.getProperty(route.paramMap.get('propertyId'));
    } else if (propertyType == 'ResidentialProperty') {
      return this.memberService.getPropertyResidential(
        route.paramMap.get('propertyId')
      );
    }
  }
}
