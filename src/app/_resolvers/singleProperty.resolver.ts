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
      return this.memberService.getProperty(route.paramMap.get('propertyId'));
    }
  }
  