import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss']
})
export class AddNewListComponent implements OnInit {

  // En el constructor llamamos al servicio de DataManagerService
  constructor(private dataManager: DataManagerService) { }

  ngOnInit() {
  }

  // Función para añadir una lista, cogemos el valor desde el evento en el HTML,
  // llamando a DataManagerService con su función de addNewList()
  addList(ev){
    if(ev.target.value.trim()!== ''){
      this.dataManager.addNewList(ev.target.value.trim());
      //console.log(ev.target.value);
      ev.target.value = '';  //Vaciamos el input
    }
  }
}
