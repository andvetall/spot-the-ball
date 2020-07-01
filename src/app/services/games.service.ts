import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private _httpClient: HttpClient) { }

  public getAllImages(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/games/getAll`)
  }

  public findOneById(id): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/games/game/${id}`)
  }

  public addOneImage(data): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/games/addOne`, data)
  }

  public updateGame(data): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/games/updateGame`, data)
  }

  public deleteGame(options): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/games/deleteGame`, options)
  }
  
}