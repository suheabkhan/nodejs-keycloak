import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getMessageForAdmin(): any {
    return new Promise((resolve, reject) => {
      return this.http
        .get<any>('http://localhost:3000/test/getSampleMessage')
        .subscribe(
          (data) => {
            console.log('data is', data);
            resolve(data);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
}
