import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseURL;
  }
  public getList<T>(): any {
    return this.http.get<T>('https://reqres.in/api/users?per_page=100');
  }

  public createUser<T>(): any {
    return this.http.post<T>('https://reqres.in/api/users', {});
  }

  public downloadFile<T>(): any {
    return this.http.get<T>('https://reqres.in/api/download', {});
  }
  public uploadFile<T>(payload: any): any {
    const formData: FormData = new FormData();
    formData.append('file', payload, payload.name);

    return this.http.post<T>(this.baseUrl + '/submit', formData);
  }
  public getDocList<T>(): any {
    return this.http.get<T>(this.baseUrl + '/tasks?assignee=manager');
  }
  public takeAction<T>(type: any): any {
    return this.http.post<T>(this.baseUrl + '/review', type);
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
}
