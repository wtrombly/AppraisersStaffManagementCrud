import { Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Appraiser } from '../models/appraiser';
import { States } from '../models/states';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from './api.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppraiserService implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  states = States;
  dataSource!: MatTableDataSource<Appraiser>;

  dataItems: object[] = [];

  private siblingMsg = new Subject<string>();

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  public getMessage(): Observable<string> {
    return this.siblingMsg.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message: string): void {
    this.siblingMsg.next(message);
  }

  getAllAppraisersArray(): Observable<any[]> {
    let dataItems: any[] = [];

    return new Observable(observer => {
      this.api.getAppraiser().subscribe({
        next: (res) => {
          let dataSource = new MatTableDataSource(res.data);
          dataSource.data.forEach(element => {
            dataItems.push(element)
          });
          console.log("dataItems", dataItems);
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
