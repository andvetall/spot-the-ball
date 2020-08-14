import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public loginUser(user): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/auth/login`, user)
  }

  public checkEmail(email): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/auth/checkEmail/${email}`)
  }

  public resetPassword(email): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/auth/resetPassword/${email}`)
  }

}
