import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getMessageForAdmin() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiBaseUrl + 'test/getSampleMessage').subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
}
