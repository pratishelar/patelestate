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
    TimeagoModule.forRoot()
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
