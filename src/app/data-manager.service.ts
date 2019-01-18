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

  //Devuelve los datos del array data
  getData(){
    return this.data;
  }

  //Para añadir una nueva lista, recibimos el nombre de la lista
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

  //Para añadir una nueva tarea, recibimos el nombre de la tarea y la lista a la que pertenece
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
    //Comprobamos que el listID de la tarea conincide con el listID de la lista
    this.data.lists = this.data.lists.map(listObj=>{
      if(listObj.listID === list.listID){
        listObj.tasks.push(newTask);
      }
      return listObj;
    });
  }

  //Para borrar una lista, recibimos el listID y filtramos un array con los que no coinciden
  deleteList(id: number) {
    this.data.lists = this.data.lists.filter(list => list.listID !== id);
  }

  //Para borrar una tarea, recibimos la tarea y filtramos un array con los que no coinciden con el taskID
  deleteTask(task: Task) {
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listID === task.listID) {
        listObj.tasks = listObj.tasks.filter(taskObj => taskObj.taskID !== task.taskID);
      }
      return listObj;
    });
  }

  //Para editar el nombre de la lista
  editingListName(list: List){
    this.data.lists = this.data.lists.map(listObj => (listObj.listID === list.listID ? list : listObj));
  }

  //Para editar el nombre la tarea
  editingTaskName(task: Task){
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listID === task.listID) {
        listObj.tasks = listObj.tasks.map(listTaskObj => {
          listTaskObj.text === listTaskObj.text ? task : listTaskObj;
          return listTaskObj;
        });
      }
      return listObj;
    });
  }

  //Método sin utilizar
  //
  //
  //
  //
  editTask(task: Task){
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listID === task.listID) {
        listObj.tasks = listObj.tasks.map(listTaskObj => {
          listTaskObj.text === listTaskObj.text ? task : listTaskObj;
          return listTaskObj;
        });
      }
      return listObj;
    });
  }

}
