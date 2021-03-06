import { Injectable } from '@angular/core';
import { List, Task } from './models.interfaces';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class DataManagerService {

  constructor(private api: ApiService, private router: Router) { }
  
  //Damos datos a "data" que es un array de Listas para probar el funcionamiento
  //Al final solo declaramos el array de datos
  data: {
    lists: Array < List >
  } = {
    lists: [
      // {
      //   listID: 0,
      //   name: 'to do',
      //   tasks: [{
      //     listID: 0,
      //     taskID: 0,
      //     text: 'tarea 1',
      //     color: '',
      //     completed: false,
      //     createAt: new Date(),
      //     modifiedAt: new Date()
      //   },
      //   {
      //     listID: 0,
      //     taskID: 1,
      //     text: 'tarea 2',
      //     color: '',
      //     completed: false,
      //     createAt: new Date(),
      //     modifiedAt: new Date()
      //   }],
      //   createdAt: new Date(),
      //   modifiedAt: new Date()
      // },
      // {
      //   listID: 1,
      //   name: 'doing',
      //   tasks: [],
      //   createdAt: new Date(),
      //   modifiedAt: new Date()
      // }
    ]
  }

  //Devuelve los datos del array data
  getData(){
    this.loadDataFromBackend();
    return this.data;
  }

  //Método para añadir una nueva lista, recibimos el nombre de la lista
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

  //Método para añadir una nueva tarea, recibimos el nombre de la tarea y la lista a la que pertenece
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

  //Método para borrar una lista, recibimos el id de la lista, y usamos el método del apiService
  deleteList(listId: number) {
    this.api.deleteList(listId).then(res => {
      this.loadDataFromBackend();
    });
  }

  //Método para borrar una tarea, recibimos la tarea y filtramos un array con los que no coinciden con el taskID
  deleteTask(task: Task) {
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listID === task.listID) {
        listObj.tasks = listObj.tasks.filter(taskObj => taskObj.taskID !== task.taskID);
      }
      return listObj;
    });
  }

  //Método para borrar las tareas
  deleteTasks(listId: number) {
    this.api.deleteTasks(listId).catch(res => {
      this.loadDataFromBackend();
    });
  }

  //Método para editar el nombre de la lista
  editingListName(list: List){
    this.data.lists = this.data.lists.map(listObj => (listObj.listID === list.listID ? list : listObj));
  }

  //Método para editar el nombre la tarea
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
    console.log(task.text+'hola'+ task.taskID+' '+task.listID);
    this.api.editTaskFinal(task.text, task.listID, task.taskID);
    this.loadDataFromBackend();
  }

  //Método para recibir todos los datos que tenemos guardados en la API, recibimos listas y sus tareas
  loadDataFromBackend() {
    this.api
      .getLists()
      .then((rawLists: Array<any>) => {
        console.log(rawLists);
        const lists = rawLists.map(rawList => ({
          listID: rawList.id,
          createdAt: rawList.createdAt,
          modifiedAt: rawList.updatedAt,
          name: rawList.name,
          tasks: [],
        }));
        Promise.all(
          lists.map(async (list: List) => {
            list.tasks = await this.api.getTasks(list.listID);
            list.tasks = list.tasks.map((rawTask: any) => ({
              listID: rawTask.idlist,
              taskID: rawTask.id,
              text: rawTask.task,
              completed: false,
              color: 'white',
              createAt: new Date(rawTask.createAt),
              modifiedAt: new Date(rawTask.updatedAt),
            }));
            return list;
          }),
        ).then(lists => {
          this.data.lists = lists;
        });
      })
      .catch(() => this.router.navigate(['/login']));
      console.log(JSON.stringify(this.data));
  }

  //Método para borrar el token llamanso a apiService
  deleteToken(){
    this.api.deleteTokenApi();
  }

}
