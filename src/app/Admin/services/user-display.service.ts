import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root',
})
export class UserDisplayService {
  private _url: string = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this._url);
  }
  updateUsers(data: Users[], id: number) {
    return this.http.put<Users[]>(this._url + id, data);
  }
}
