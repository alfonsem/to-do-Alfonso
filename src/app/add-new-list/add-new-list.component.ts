import { Component } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss']
})
export class AddNewListComponent {

  // En el constructor llamamos al servicio de DataManagerService y al servicio ApiService
  constructor(private dataManager: DataManagerService, private api: ApiService) { }

  // Función para añadir una lista, cogemos el valor desde el evento en el HTML,
  // llamando a DataManagerService con su función de addNewList() y luego hacemos la
  // llamada a la API con el método newList y la añadimos
  addList(ev){
    if(ev.target.value.trim()!== ''){
      this.dataManager.addNewList(ev.target.value.trim());
      this.api.newList(ev.target.value.trim());
      ev.target.value = '';  //Vaciamos el input
    }
  }
}
