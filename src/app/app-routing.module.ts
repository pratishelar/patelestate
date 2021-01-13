import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertiesFullGridComponent } from './propertiesFullGrid/propertiesFullGrid.component';
import { SinglePropertyComponent } from './singleProperty/singleProperty.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PropertiesResolver } from './_resolvers/properties.Resolver';
import { SinglePropertyResolver } from './_resolvers/singleProperty.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'properties', component: PropertiesFullGridComponent, resolve: {properties: PropertiesResolver} },
  { path: 'property/:propertyId', component: SinglePropertyComponent, resolve: {property: SinglePropertyResolver} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
