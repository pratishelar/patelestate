import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesFullGridComponent } from './propertiesFullGrid/propertiesFullGrid.component';
import { HomeComponent } from './home/home.component';
import { SinglePropertyComponent } from './singleProperty/singleProperty.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PropertiesService } from './_services/properties.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PropertiesResolver } from './_resolvers/properties.Resolver';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { BusyService } from './_services/busy.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeagoModule } from 'ngx-timeago';
import { SinglePropertyResolver } from './_resolvers/singleProperty.resolver';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [					
    AppComponent,
      PropertiesFullGridComponent,
      HomeComponent,
      SinglePropertyComponent,
      LoginComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TimeagoModule.forRoot(),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAR535bjLnTAM3ol07v1Cd-MD5_Vpps2y0'
    }),
    AgmJsMarkerClustererModule,
    AgmSnazzyInfoWindowModule,
    ModalModule.forRoot(),
    NgxGalleryModule,
    PaginationModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    PropertiesService, 
    PropertiesResolver,
    BusyService,
    SinglePropertyResolver,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
