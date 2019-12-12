import { Credentials } from './../../models/credenetials';
import { Jwt } from './../../models/jwt';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(credentials: Credentials): Observable<Jwt> {
    return this.http.post<Jwt>('/api/login', credentials).pipe(map(jwt => {
      this.setToken(jwt);
      return jwt;
    }));
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') === null;
  }

  public setToken(jwt: Jwt): void {
    localStorage.setItem('token', jwt.token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
