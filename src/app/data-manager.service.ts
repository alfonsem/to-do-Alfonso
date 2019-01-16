import {
  Injectable
} from '@angular/core';
import {
  List
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
        tasks: [],
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

}
