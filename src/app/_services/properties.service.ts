import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  baseUrl = 'https://patelestateapi-dev.azurewebsites.net/api/';

  constructor(private http: HttpClient) {}

  public data = {};

  setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }

  clearOption() {
    this.data = {};
  }

  getCommercialProperties(
    top?,
    skip?,
    sort?,
    propertysearchinput?,
    propertyTypeinput?,
    minPriceInput?,
    maxPriceInput?,
    exclusive?,
    forSale?,
    minsqft?,
    maxsqft?
  ): Observable<any> {
    let params = new HttpParams();
    if (top) params = params.append('$top', top);

    if (skip) params = params.append('$skip', skip);

    if (sort) params = params.append('$orderby', sort);

    var param = '';

    if (propertysearchinput) {
      if (param) 
      param =  param.concat(' or contains(city' + ",'"  + propertysearchinput + "')" + ' or contains(address' + ",'" + propertysearchinput + "')" + ' or contains(postalCode' + ",'" + propertysearchinput + "')" + ' or contains(state' + ",'" + propertysearchinput + "')" + ' or contains(mlsId' + ",'" + propertysearchinput + "')" );

      else 
      param = '(contains(city' + ",'" + propertysearchinput + "')" + ' or contains(address' + ",'" + propertysearchinput + "')" + ' or contains(postalCode' + ",'" + propertysearchinput + "')" + ' or contains(state' + ",'" + propertysearchinput + "')" + ' or contains(mlsId' + ",'" + propertysearchinput + "'))" ;

    }

    if (propertyTypeinput)
      if (param)
        param = param.concat(
          ' and propertyType eq ' + "'" + propertyTypeinput + "'"
        );
      else param = 'propertyType eq ' + "'" + propertyTypeinput + "'";

    if (minPriceInput)
      if (param) param = param.concat(' and askingPrice gt ' + minPriceInput);
      else param = 'askingPrice gt ' + minPriceInput;

    if (maxPriceInput)
      if (param) param = param.concat(' and askingPrice lt ' + maxPriceInput);
      else param = 'askingPrice lt ' + maxPriceInput;

    if (exclusive)
      if (param) param = param.concat(' and exclusive eq ' + exclusive);
      else param = 'exclusive eq ' + exclusive;

    if (forSale)
      if (param)
        param = param.concat(' and transactionType eq ' + "'" + forSale + "'");
      else param = 'transactionType eq ' + "'" + forSale + "'";

    if (minsqft)
      if (param) param = param.concat(' and totalFinishedArea gt ' + minsqft);
      else param = 'totalFinishedArea gt ' + minsqft;

    if (maxsqft)
      if (param) param = param.concat(' and totalFinishedArea lt ' + maxsqft);
      else param = 'totalFinishedArea lt ' + maxsqft;

    if (param) params = params.append('$filter', param);

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

  getResidentialProperties(
    top?,
    skip?,
    sort?,
    propertysearchinput?,
    propertyTypeinput?,
    minPriceInput?,
    maxPriceInput?,
    exclusive?,
    forSale?,
    openHouse?,
    bed?,
    bath?,
    minsqft?,
    maxsqft?,
    forCloser?,
    basement?
  ): Observable<any> {
    let params = new HttpParams();

    if (top) params = params.append('$top', top);

    if (skip) params = params.append('$skip', skip);

    if (sort) params = params.append('$orderby', sort);

    var param = '';

    if (propertysearchinput) {
      if (param) 
      param =  param.concat(' or contains(city' + ",'"  + propertysearchinput + "')" + ' or contains(address' + ",'" + propertysearchinput + "')" + ' or contains(postalCode' + ",'" + propertysearchinput + "')" + ' or contains(province' + ",'" + propertysearchinput + "')" + ' or contains(mlsId' + ",'" + propertysearchinput + "')" + ' or contains(communityName' + ",'" + propertysearchinput + "')");

      else 
      param = '(contains(city' + ",'" + propertysearchinput + "')" + ' or contains(address' + ",'" + propertysearchinput + "')" + ' or contains(postalCode' + ",'" + propertysearchinput + "')" + ' or contains(province' + ",'" + propertysearchinput + "')" + ' or contains(mlsId' + ",'" + propertysearchinput + "')" + ' or contains(communityName' + ",'" + propertysearchinput + "'))";

    }

    if (propertyTypeinput)
      if (param)
        param = param.concat(
          ' and propertyType eq ' + "'" + propertyTypeinput + "'"
        );
      else param = 'propertyType eq ' + "'" + propertyTypeinput + "'";

    if (minPriceInput)
      if (param)
        param = param.concat(' and price gt ' + "'" + minPriceInput + "'");
      else param = 'price gt ' + "'" + minPriceInput + "'";

    if (maxPriceInput)
      if (param)
        param = param.concat(' and price lt ' + "'" + maxPriceInput + "'");
      else param = 'price lt ' + "'" + maxPriceInput + "'";

    if (exclusive)
      if (param) param = param.concat(' and exclusive eq ' + exclusive);
      else param = 'exclusive eq ' + exclusive;

    if (forSale)
      if (param)
        param = param.concat(' and transactionType eq ' + "'" + forSale + "'");
      else param = 'transactionType eq ' + "'" + forSale + "'";

    if (openHouse)
      if (param) param = param.concat(' and openHouse eq ' + openHouse);
      else param = 'openHouse eq ' + openHouse;

    if (bed)
      if (param) param = param.concat(' and bedroomsTotal gt ' + bed);
      else param = 'bedroomsTotal gt ' + bed;

    if (bath)
      if (param) param = param.concat(' and bathroomTotal gt ' + bath);
      else param = 'bathroomTotal gt ' + bath;

    if (minsqft)
      if (param) param = param.concat(' and totalFinishedArea gt ' + "'" + minsqft + "'");
      else param = 'totalFinishedArea gt ' + "'" + minsqft + "'";

    if (maxsqft)
      if (param) param = param.concat(' and totalFinishedArea lt ' + "'" + maxsqft + "'");
      else param = 'totalFinishedArea lt ' + "'" + maxsqft + "'";

    if (forCloser)
      if (param) param = param.concat(' and forCloser eq ' + forCloser);
      else param = 'forCloser eq ' + forCloser;

    if (basement)
      if (param) param = param.concat(' and basement eq ' + basement);
      else param = 'basement eq ' + basement;


    if (param) params = params.append('$filter', param);

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

  getResidentialMap(
    skip?,
    sort?,
    propertysearchinput?,
    propertyTypeinput?,
    minPriceInput?,
    maxPriceInput?,
    exclusive?,
    forSale?,
    openHouse?,
    bed?,
    bath?,
    minsqft?,
    maxsqft?
  ): Observable<any> {
    let params = new HttpParams();

    // if (top) params = params.append('$top', top);

    if (skip) params = params.append('$skip', skip);

    if (sort) params = params.append('$orderby', sort);

    var param = '';

    if (propertysearchinput) {
      if (param) 
      param =  param.concat(' or contains(city' + ",'"  + propertysearchinput + "')" + ' or contains(address' + ",'" + propertysearchinput + "')" + ' or contains(postalCode' + ",'" + propertysearchinput + "')" + ' or contains(province' + ",'" + propertysearchinput + "')" + ' or contains(communityName' + ",'" + propertysearchinput + "')");

      else 
      param = 'contains(city' + ",'" + propertysearchinput + "')" + 'or contains(address' + ",'" + propertysearchinput + "')" + ' or contains(postalCode' + ",'" + propertysearchinput + "')" + ' or contains(province' + ",'" + propertysearchinput + "' )" + ' or contains(communityName' + ",'" + propertysearchinput + "')";

    }

    if (propertyTypeinput)
      if (param)
        param = param.concat(
          ' and propertyType eq ' + "'" + propertyTypeinput + "'"
        );
      else param = 'propertyType eq ' + "'" + propertyTypeinput + "'";

    if (minPriceInput)
      if (param) param = param.concat(' and askingPrice gt ' + minPriceInput);
      else param = 'askingPrice gt ' + minPriceInput;

    if (maxPriceInput)
      if (param) param = param.concat(' and askingPrice lt ' + maxPriceInput);
      else param = 'askingPrice lt ' + maxPriceInput;

    if (exclusive)
      if (param) param = param.concat(' and exclusive eq ' + exclusive);
      else param = 'exclusive eq ' + exclusive;

    if (forSale)
      if (param) param = param.concat(' and transactionType eq ' + forSale);
      else param = 'transactionType eq ' + forSale;

    if (openHouse)
      if (param) param = param.concat(' and openHouse eq ' + openHouse);
      else param = 'openHouse eq ' + openHouse;

    if (bed)
      if (param) param = param.concat(' and bedroomsTotal eq ' + bed);
      else param = 'bedroomsTotal eq ' + bed;

    if (bath)
      if (param) param = param.concat(' and bathroomTotal eq ' + bath);
      else param = 'bathroomTotal eq ' + bath;

    if (minsqft)
      if (param) param = param.concat(' and totalFinishedArea gt ' + minsqft);
      else param = 'totalFinishedArea gt ' + minsqft;

    if (maxsqft)
      if (param) param = param.concat(' and totalFinishedArea lt ' + maxsqft);
      else param = 'totalFinishedArea lt ' + maxsqft;

    if (param) params = params.append('$filter', param);

    return this.http.get<any[]>(this.baseUrl + 'ResidentialProperty/map', {
      observe: 'response',
      params,
    });
  }
}
