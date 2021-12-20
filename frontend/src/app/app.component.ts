import { Component, OnInit } from '@angular/core';
import { TestService } from './services/keycloak.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private service:TestService) { }


  ngOnInit(): void {
    this.service.login().subscribe(data=>{
      console.log(data)
      this.service.accessToken=data.accessToken;
      this.service.refreshToken=data.refreshToken;
      this.service.idToken=data.idToken;
      this.service=data.accessToken;
      localStorage.setItem("access_token",data.accessToken);
      localStorage.setItem("refresh_token",data.refreshToken);
      localStorage.setItem("id_token",data.idToken);
    });
}
}
