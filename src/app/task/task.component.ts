import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models.interfaces';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  //Nos traemos la información de las tareas
  @Input() task: Task;

  //Importamos en el contructor el DataManagerSeervice
  constructor(private dataManager: DataManagerService) { }

  ngOnInit() {
  }

  //Para borrar una tarea, llamamos al método deleteTask de Data ManagerService
  delete(){
    this.dataManager.deleteTask(this.task);
  }

}
