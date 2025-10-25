import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeticionesService {
  public url: string = 'https://reqres.in/';

  constructor(private _http: HttpClient) {}

  getUser(userId: number | string): Observable<any> {
    return this._http.get(this.url + 'api/users/' + userId);
  }

  addUser(user: any): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'api/users', params, { headers });
  }
}
