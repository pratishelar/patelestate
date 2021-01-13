import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  baseUrl = 'https://patelestateapi-dev.azurewebsites.net/api/CommercialProperties';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<any> {
    let params = new HttpParams();

    params = params.append('$top', '10');
    params = params.append('$orderby', 'listingDate DESC');

    return this.http.get<any[]>(this.baseUrl, {
      observe: 'response',
      params,
    });
  }

  getProperty(propertyId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/' + propertyId );
  }
}

// https://patelestateapi-dev.azurewebsites.net/api/CommercialProperties/a8d88118-5db7-4db7-8764-19c30cba03be