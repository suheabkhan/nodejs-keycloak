import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { HomeComponent } from './home/home.component';
import { AuthGuardKeycloak } from './utils/app.guard';
import { initializeKeycloak } from './utils/app.init';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuardKeycloak]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  KeycloakAngularModule,
  HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
