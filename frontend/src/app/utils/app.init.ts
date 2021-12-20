
import { KeycloakService } from "keycloak-angular";



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


