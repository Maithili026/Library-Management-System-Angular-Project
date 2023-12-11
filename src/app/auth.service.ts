import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://your-api-url'; // Update with your API URL

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, user);
  }

  verifyOTP(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/verify-otp`, data);
  }
}
