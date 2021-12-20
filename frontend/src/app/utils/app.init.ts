import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { TestService } from "../services/keycloak.service";

// let access_token='';
// export class TestKeycloak implements OnInit{
//     constructor(private service : TestService ){
     
            
//     }
    
//     ngOnInit(){
//             access_token=this.service.accessToken;
//     }

    
// }

export function initializeKeycloak(keycloak:KeycloakService): () => Promise<boolean> {
    return () =>
    
        keycloak.init({
            config: {
                url: 'http://localhost:8080/auth',
                realm: 'test',
                clientId: 'angular-test',
            },
            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25,
                token: localStorage.getItem("access_token")||"",
                refreshToken:localStorage.getItem("refresh_token")||"",
                idToken:localStorage.getItem("id_token")||""
            },
            loadUserProfileAtStartUp: true,
            // bearerExcludedUrls: ['/'],
            
        });
}


