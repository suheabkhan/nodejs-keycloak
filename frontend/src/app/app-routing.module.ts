import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardKeycloak } from './utils/app.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuardKeycloak]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
