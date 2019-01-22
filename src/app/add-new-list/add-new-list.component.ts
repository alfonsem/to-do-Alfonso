import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss']
})
export class AddNewListComponent implements OnInit {

  // En el constructor llamamos al servicio de DataManagerService
  constructor(private dataManager: DataManagerService, private api: ApiService) { }

  ngOnInit() {
  }

  // Función para añadir una lista, cogemos el valor desde el evento en el HTML,
  // llamando a DataManagerService con su función de addNewList()
  addList(ev){
    if(ev.target.value.trim()!== ''){
      this.dataManager.addNewList(ev.target.value.trim());
      this.api.newList(ev.target.value.trim());
      console.log(ev.target.value.trim()+'kkk');
      ev.target.value = '';  //Vaciamos el input
    }
  }
}
