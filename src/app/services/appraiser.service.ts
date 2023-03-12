import { Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Appraiser } from '../models/appraiser';
import { States } from '../models/states';

import { ApiService } from './api.service';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppraiserService {

  states = States;
  dataSource!: MatTableDataSource<Appraiser>;
  singleAppraiser!: MatTableDataSource<Appraiser>;

  dataItems: object[] = [];


  constructor(private api: ApiService) { }


  getAllAppraisersArray(): Observable<any[]> {
    let dataItems: any[] = [];

    return new Observable(observer => {
      this.api.getAppraiser().subscribe({
        next: (res) => {
          let dataSource = new MatTableDataSource(res.data);
          dataSource.data.forEach(element => {
            dataItems.push(element)
          });
          observer.next(dataItems);
        },
        error: (err) => {
          observer.error('Error while fetching the data');
        },
        complete: () => {
          observer.complete();
        }
      });
    });
  }

  getAppraiser(emp_id: number): any {
    this.api.getAppraiser().subscribe({
      next: (res) => {
        this.singleAppraiser = res.data;

      },
      error: (err) => {
        alert('Error while fetching the data');
      },

    });return this.singleAppraiser;
  }

  verifyAppraiserCoverage(emp_id: number, orderId: number) {
     this.singleAppraiser = this.getAppraiser(emp_id);
   // if state_name of appraiser == state_name of order,
   // return true
   // else return false
  }


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
