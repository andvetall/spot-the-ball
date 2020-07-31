import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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

  private _allUsers = new BehaviorSubject<any>(null);
  public allUsers = this._allUsers.asObservable()
  public setAllUsers(users: any){
    this._allUsers.next(users)
  }

  public getAllUsers(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/user/getAllUsers`);
  }

  public inviteUser(userEmail): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/user/inviteUser`, userEmail);
  }

  public sendRequest(newUser): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/user/sendRequest`, newUser)
  }

  public requestAmount = new Subject<number>()
  public setRequestAmoun(amount: number){
    this.requestAmount.next(amount)
  }

  public getAllRequests(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/user/getAllRequests`)
  }

  public deleteRequest(email): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/user/deleteRequest`, email)
  }
}