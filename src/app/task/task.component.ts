import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models.interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  //Nos traemos la información de las tareas
  @Input() task: Task;
  constructor() { }

  ngOnInit() {
  }

}
