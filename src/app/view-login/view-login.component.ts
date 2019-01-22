import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.scss']
})
export class ViewLoginComponent {
  username: string;
  password: string;
  error: any;

  constructor( private api: ApiService, private router: Router) { }

  //Método para logearnos, usamos el método de login de ApiService
  login() {
    const { username, password } = this;
    if (username.trim() !== '' && password.trim() !== '') {
      this.api
        .login(username.trim(), password.trim())
        .then(() => {
          this.error = undefined;
          this.router.navigate(['/board']);
        })
        .catch(error => {
          this.error = error;
        });
    }
  }

}
