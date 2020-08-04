import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Post } from 'src/models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    public http: HttpClient,
    public router: Router
    ) { }

    listarPostPorUsuario(id: number){
      const url = `${environment.URL_API}posts?userId=${id}`;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.get(url,  { headers } );
    }

    eliminarPost(id: number){
      const url = `${environment.URL_API}posts/${id}`
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.delete(url,  { headers } );
    }
    
    editarPost(post: Post){
      const url = `${environment.URL_API}posts/${post.id}`
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.put(url, {post}, { headers } );
    }
    
    agregarPost(post: Post){
      const url = `${environment.URL_API}posts`
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(url, {post}, { headers } );
    }
}
