import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwt: string = localStorage.getItem('jwt');

  //Importamos el servicio HttpClient al constructor
  constructor(private http: HttpClient) { }

  //Método para registranos usamos el método post llamando a la API
  register(username: string , password: string ){
    const body = {username, password};
    return this.http.post('https://apitrello.herokuapp.com/users', body).toPromise();
  }

  //Método para logearno usamos el método de la API, nos devuelve el token que necesitamos y lo
  //guardamos en LocalStorage para ppoder utlizarlo cuando nos haga falta
  login(username: string, password: string) {
    const body = { username, password };

    return new Promise((resolve, reject) => {
      this.http
        .post('https://apitrello.herokuapp.com/users/login', body)
        .toPromise()
        .then(() => {
          reject('User not found');
        })
        .catch(maybeNotAndError => {
          if (maybeNotAndError.status === 200) {
            const jwt = maybeNotAndError.error.text;
            this.jwt = jwt;
            localStorage.setItem('jwt', jwt);
            resolve(200);
          } else if (maybeNotAndError.status === 401) {
            reject('Wrong password');
          } else {
            reject('Try again');
          }
        });
    });
  }

  //Método para crear una nueva lista, hacemos un post a la API
  newList(name: string): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    const body = { name };
    return this.http.post('https://apitrello.herokuapp.com/list/', body, options).toPromise();
  }

  //Método para recibir todas las listas que tenemos en la API
  getLists(): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.get('https://apitrello.herokuapp.com/list', options).toPromise();
  }

  //Método para crear una nueva lista, hacemos un post a la API
  newTask(listID: number, taskName:string): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    const body = { idlist :listID, task: taskName };
    console.log(listID + taskName);
    return this.http.post('https://apitrello.herokuapp.com/tasks', body).toPromise();
  }

  //Método para recibir todas las tareas que tenemos en la API
  getTasks(idlist: number): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return new Promise((resolve, reject) => {
      this.http
        .get('https://apitrello.herokuapp.com/list/tasks/' + idlist, options)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  }

  //Método para borrar una lista , recibimos el id de la lista y usamos el delete del API
  deleteList(id: number): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.delete('https://apitrello.herokuapp.com/list/' + id, options).toPromise();
  }

  //Método para borrar todas las tareas de la lista, usamos el deleteTask del API y recibimos el id de la lista
  deleteTasks(idlist: number): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.delete('https://apitrello.herokuapp.com/list/tasks/'+idlist).toPromise();
  }

  //Método para editar el nombre de la tarea, usamos el PUT del API
  editTaskFinal(taskName: string, idList: number, idTask: number){
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    const body = { task :taskName };
    return this.http.put('https://apitrello.herokuapp.com/tasks/'+idTask, body, options).toPromise();
  }
}
