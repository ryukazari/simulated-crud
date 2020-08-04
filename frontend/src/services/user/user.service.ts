import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    public router: Router
    ) { }

    listarUsuarios(){
      const url = `${environment.URL_API}users`;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.get(url,  { headers } );
    }
}
