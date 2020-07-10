import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _httpClient: HttpClient
  ) {}

  public addUser(user): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/user/addUser`, user);
  }

  public updateUserInfo(user): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/user/updateUserInfo`, user);
  }

  public deleteUser(user): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/user/deleteUser`, user);
  }

  public getAllUsers(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/user/getAllUsers`);
  }
}