import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Importamos el servicio HttpClient al constructor
  constructor(private http: HttpClient) { }

  //Para registranos
  register(username, password){
    const body = {username, password};
    return this.http.post('https://apitrello.herokuapp.com/users', body).toPromise();
  }
}
