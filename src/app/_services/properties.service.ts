import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  baseUrl = 'https://patelestateapi-dev.azurewebsites.net/api/';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<any> {
    let params = new HttpParams();

    params = params.append('$top', '10');
    params = params.append('$orderby', 'listingDate DESC');

    return this.http.get<any[]>(this.baseUrl + 'CommercialProperties', {
      observe: 'response',
      params,
    });
  }

  getProperty(propertyId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + 'CommercialProperties/' + propertyId );
  }
  getPropertyResidential(propertyId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + 'ResidentialProperty/' + propertyId );
  }

  getResidentialProperties(): Observable<any> {
    let params = new HttpParams();

    //params = params.append('$top', '10');

    return this.http.get<any[]>(this.baseUrl + 'ResidentialProperty', {
      observe: 'response',
      params,
    });  }
}

