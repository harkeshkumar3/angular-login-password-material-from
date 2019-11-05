import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  public url = 'https://www.nexens.us/web'
 // public url = 'http://localhost/web'
  public liveApplicationUrl = 'https://www.nexens.us/';

  constructor(private http: HttpClient) { }


  public sendEmailLink(obj: any): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.get(this.url + "/password.nex?action=sendPasswordResetLink&userName=" + obj);
  }

  public resetPassword(id, token, newPassword, confirmPassword): Observable<any> {
    return this.http.get(this.url + "/password.nex?action=resetPassword&userId=" + id + "&token=" + token + "&newPassword=" + newPassword + "&confirmPassword=" + confirmPassword, {responseType: 'text'})
  }

  public validateTokenString(id, token): Observable<any> {
    return this.http.get(this.url + "/password.nex?action=validateToken&userId=" + id + "&token=" + token ,{responseType: 'text'});
  }
}
