import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  baseUrl = 'https://patelestateapi-dev.azurewebsites.net/api/';

  constructor(private http: HttpClient) {}

  getCommercialProperties(top,skip): Observable<any> {
    let params = new HttpParams();

    params = params.append('$top', top);
    params = params.append('$orderby', 'listingDate DESC');
    params = params.append('$skip', skip);


    return this.http.get<any[]>(this.baseUrl + 'CommercialProperties', {
      observe: 'response',
      params,
    });
  }

  getcommercialSingle(propertyId): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl + 'CommercialProperties/' + propertyId
    );
  }

  

  getResidentialProperties(): Observable<any> {
    let params = new HttpParams();

    params = params.append('$top', '9');

    return this.http.get<any[]>(this.baseUrl + 'ResidentialProperty', {
      observe: 'response',
      params,
    });
  }

  getResidentialSingle(propertyId): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl + 'ResidentialProperty/' + propertyId
    );
  }

  
}
