import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getAllResults(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/results/getAll`)
  }

  public getOneById(id): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/results/getById/${id}`)
  }

  public addResult(result): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/results/addResult`, result)
  }

  public createCsv(id): any {
    return this._httpClient.get(`${environment.apiUrl}/results/createCsv/${id}`)
  }

}