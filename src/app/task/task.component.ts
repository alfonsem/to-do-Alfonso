import { Component, Input } from '@angular/core';
import { Task } from '../models.interfaces';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  //Nos traemos la información de las tareas
  @Input() task: Task;
  editing: boolean = true;
  newTaskName: string = '';

  //Importamos en el contructor el DataManagerSeervice
  constructor(private dataManager: DataManagerService) { }

  //Para borrar una tarea, llamamos al método deleteTask de Data ManagerService
  delete(){
    //Cambiamos el método y borramos todas las tareas de una lista
    this.dataManager.deleteTasks(this.task.listID);
  }

  //Para cambiar el estado del booleno editing
  cambioEditing(){
    this.editing = false;
  }

  //Método para editar el nombre de la tarea llamando al método editingTaskName del managerService
  editTaskName(){
    console.log(this.task.text+'antes'+ this.task.taskID+' '+this.task.listID);
    this.task.text = this.newTaskName;
    console.log(this.task.text+'después'+ this.task.taskID+' '+this.task.listID);
    this.dataManager.editingTaskName(this.task);
    this.editing = true; //Cambiamos editing para que se vuelva a mostrar el nombre y no el input
    console.log(this.task.text+'final'+ this.task.taskID+' '+this.task.listID);
  }

  //Método para cuando se hace doble click
  editTask(){
    this.editing = false;
  }

  //Método para cuando se pierde el foco
  editLoose(){
    this.editing = true;
  }

}
