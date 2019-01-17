import {
  Injectable
} from '@angular/core';
import {
  List, Task
} from './models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  //constructor() { }
  
  //Damos datos a "data" que es un array de Listas para probar el funcionamiento
  data: {
    lists: Array < List >
  } = {
    lists: [{
        listID: 0,
        name: 'to do',
        tasks: [{
          listID: 0,
          taskID: 0,
          text: 'tarea 1',
          color: '',
          completed: false,
          createAt: new Date(),
          modifiedAt: new Date()
        },
        {
          listID: 0,
          taskID: 1,
          text: 'tarea 2',
          color: '',
          completed: false,
          createAt: new Date(),
          modifiedAt: new Date()
        }],
        createdAt: new Date(),
        modifiedAt: new Date()
      },
      {
        listID: 1,
        name: 'doing',
        tasks: [],
        createdAt: new Date(),
        modifiedAt: new Date()
      }
    ]
  }

  getData(){
    return this.data;
  }

  addNewList(name: string) {
    const now = new Date();
    const newList: List = {
      listID: Date.now(),
      createdAt: now,
      modifiedAt: now,
      name,
      tasks: [],
    };
    this.data.lists.push(newList);
  }

  addNewtask(text: string, list: List){
    const newTask : Task = {
        listID: list.listID,
        taskID: Date.now(),
        text,
        color: '',
        completed: false,
        createAt: new Date(),
        modifiedAt: new Date()
    };
    this.data.lists = this.data.lists.map(listObj=>{
      if(listObj.listID === list.listID){
        listObj.tasks.push(newTask);
      }
      return listObj;
    });
  }

  deleteList(list: List) {
    this.data.lists = this.data.lists.filter(list => list.listID !== list.listID);
  }

  deleteTask(task: Task){
    this.data.lists = this.data.lists.map(listObj => {
      if(listObj.listID === listObj.listID){
          listObj.tasks = listObj.tasks.filter(task => task.taskID !== task.taskID);
      }
      return listObj;
    });
  }

}
