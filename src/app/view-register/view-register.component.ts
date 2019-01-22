import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-register',
  templateUrl: './view-register.component.html',
  styleUrls: ['./view-register.component.scss']
})
export class ViewRegisterComponent {

  username: string;
  password: string;
  error: any;
  valid: any;
  constructor(private api: ApiService) {}

  //Método para registrarnos usando el método de register de ApiService
  register() {
    const { username, password } = this;
    if (username.trim() !== '' && password.trim() !== '') {
      this.api
        .register(username.trim(), password.trim())
        .then(res => {
          this.valid = res;
        })
        .catch(error => {
          this.error = error;
        });
    }
    console.log(password);
  }

}
