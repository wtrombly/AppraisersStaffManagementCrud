import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../models/order';
import { States } from '../models/states';
import { ApiService } from './api.service';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  states = States;
  dataSource!: MatTableDataSource<Order>;
  singleOrder!: MatTableDataSource<Order>;

  dataItems: object[] = [];

  constructor(private api: ApiService) { }

  getAllOrdersArray(): Observable<any[]> {
    let dataItems: any[] = [];

    return new Observable(observer => {
      this.api.getOrder().subscribe({
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

  getOrder(id: number): any {
    this.api.getOrder().subscribe({
      next: (res) => {
        this.singleOrder = res.data;

      },
      error: (err) => {
        alert('Error while fetching the data');
      },

    });return this.singleOrder;
  }

}


