import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Appraiser } from '../models/appraiser';
import { States } from '../models/states';

@Injectable({
  providedIn: 'root'
})
export class AppraiserService {

  states = States;
  dataSource!: MatTableDataSource<Appraiser>;

  constructor() { }
  

  getStateResidenceName(dataSource : MatTableDataSource<Appraiser>) : any {
    const data = this.dataSource.data;

    for(let i = 0; i < data.length; i++){
      for(let j = 0; j < this.states.length; j++){
        if(data[i].state_id == this.states[j].id){
          data[i].state_name = this.states[j].name
        }
      }
    }
 }

}
