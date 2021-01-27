import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  baseUrl = 'https://patelestateapi-dev.azurewebsites.net/api/';

  constructor(private http: HttpClient) {
    
  }

  public data = {};  
  
  setOption(option, value) {      
     this.data[option] = value;  
   }  
   
   getOption() {  
     return this.data;  
   }

   clearOption(){
    this.data = {};
   }

  getCommercialProperties(top?,skip?,sort?,propertysearchinput?,propertyTypeinput?, minPriceInput?,maxPriceInput?,exclusive?): Observable<any> {
    let params = new HttpParams();
    if(top)
    params = params.append('$top', top);

    if(skip)
    params = params.append('$skip', skip);
    
    if(sort)
    params = params.append('$orderby', sort);
    
    var param ="";

    if(propertysearchinput)
    if(param)
    param = ' and city eq ' + "'" +propertysearchinput+"'";
    else
    param = 'city eq ' + "'" +propertysearchinput+"'";

    if(propertyTypeinput)
    if(param)
    param = param.concat(' and propertyType eq ' + "'" + propertyTypeinput + "'");
    else
    param ='propertyType eq ' + "'" + propertyTypeinput + "'";

    if(minPriceInput)
    if(param)
    param = param.concat(' and askingPrice gt ' + minPriceInput );
    else
    param ='askingPrice gt ' + minPriceInput ;

    if(maxPriceInput)
    if(param)
    param = param.concat(' and askingPrice lt ' + maxPriceInput );
    else
    param ='askingPrice lt ' + maxPriceInput ;

    if(exclusive)
    if(param)
    param = param.concat(' and exclusive eq ' + exclusive );
    else
    param ='exclusive eq ' + exclusive ;

    if(param)
    params = params.append('$filter',param);

    // params = params.append('$inlinecount',"allpages");

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

  
  getResidentialProperties(top?,skip?,sort?,propertysearchinput?,propertyTypeinput?, minPriceInput?,maxPriceInput?): Observable<any> {
    let params = new HttpParams();

    if(top)
    params = params.append('$top', top);

    if(skip)
    params = params.append('$skip', skip);
    
    if(sort)
    params = params.append('$orderby', sort);
    
    var param ="";

    if(propertysearchinput)
    if(param)
    param = ' and city eq ' + "'" +propertysearchinput+"'";
    else
    param = 'city eq ' + "'" +propertysearchinput+"'";

    if(propertyTypeinput)
    if(param)
    param = param.concat(' and propertyType eq ' + "'" + propertyTypeinput + "'");
    else
    param ='propertyType eq ' + "'" + propertyTypeinput + "'";

    if(minPriceInput)
    if(param)
    param = param.concat(' and price gt ' + "'" + minPriceInput + "'");
    else
    param ='price gt ' + "'" + minPriceInput + "'" ;

    if(maxPriceInput)
    if(param)
    param = param.concat(' and price lt ' +  "'" + maxPriceInput + "'" );
    else
    param ='price lt ' +  "'" + maxPriceInput + "'";


    if(param)
    params = params.append('$filter',param);

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

  getResidentialMap(top?,skip?,sort?,propertysearchinput?,propertyTypeinput?, minPriceInput?,maxPriceInput?): Observable<any> {
    let params = new HttpParams();

    if(top)
    params = params.append('$top', top);

    if(skip)
    params = params.append('$skip', skip);
    

    if(sort)
    params = params.append('$orderby', sort);
    
    var param ="";

    if(propertysearchinput)
    if(param)
    param = ' and city eq ' + "'" +propertysearchinput+"'";
    else
    param = 'city eq ' + "'" +propertysearchinput+"'";

    if(propertyTypeinput)
    if(param)
    param = param.concat(' and propertyType eq ' + "'" + propertyTypeinput + "'");
    else
    param ='propertyType eq ' + "'" + propertyTypeinput + "'";

    if(minPriceInput)
    if(param)
    param = param.concat(' and askingPrice gt ' + minPriceInput );
    else
    param ='askingPrice gt ' + minPriceInput ;

    if(maxPriceInput)
    if(param)
    param = param.concat(' and askingPrice lt ' + maxPriceInput );
    else
    param ='askingPrice lt ' + maxPriceInput ;


    if(param)
    params = params.append('$filter',param);
  
    return this.http.get<any[]>(this.baseUrl + 'ResidentialProperty/map', {
      observe: 'response',
      params,
    });
  }

  
}
