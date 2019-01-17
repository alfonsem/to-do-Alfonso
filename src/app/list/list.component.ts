import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models.interfaces';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list : List;

  constructor(private dataManager : DataManagerService) { }

  //Método con el que añadimos una tarea nueva llamando al serviceManager y su método de añadir tarea
  addTask(ev){
    if(ev.target.value.trim()!== ''){
      this.dataManager.addNewtask(ev.target.value.trim(), this.list);
      console.log(ev.target.value);
      ev.target.value = '';  //Vaciamos el input
    }
  }

  ngOnInit() {
  }

}
