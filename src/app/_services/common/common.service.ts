import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {

  }
 public getList<T>(): any{
    return this.http.get<T>('https://reqres.in/api/users?per_page=100');
  }

  public createUser<T>(): any{
    return this.http.post<T>('https://reqres.in/api/users',{});
  }

  public downloadFile<T>(): any{
    return this.http.get<T>('https://reqres.in/api/download',{});
  }


}
