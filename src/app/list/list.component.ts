import { Component, Input } from '@angular/core';
import { List } from '../models.interfaces';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() list : List;
  editing: boolean = true;
  newListName: string = '';

  constructor(private dataManager : DataManagerService) { }

  //Método con el que añadimos una tarea nueva llamando al serviceManager y su método addNewtask()
  addTask(ev){
    if(ev.target.value.trim()!== ''){
      this.dataManager.addNewtask(ev.target.value.trim(), this.list);
      console.log(ev.target.value);
      ev.target.value = '';  //Vaciamos el input
    }
  }

  //Método para borrar una lista llamando al serviceManager y su método deleteList()
  delete(){
    this.dataManager.deleteList(this.list.listID);
  }

  //Para cambiar el estado del booleno editing
  cambioEditing(){
    this.editing = false;
  }

  //Método para editar el nombre de la lista, llamando al serviceManager y su método editingListName()
  editListName(){
    this.list.name = this.newListName;
    this.dataManager.editingListName(this.list);
    this.editing = true; //Cambiamos editing para que se vuelva a mostrar el nombre y no el input
    console.log(this.list.name);
  }

  //Método para el doble click que me cambia el valor de editing
  editList(){
    this.editing = false;
  }

}
