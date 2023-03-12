import { Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../models/client';
import { States } from '../models/states';
import { ApiService } from './api.service';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  states = States;
  dataSource!: MatTableDataSource<Client>;
  singleClient!: MatTableDataSource<Client>;

  dataItems: object[] = [];

  constructor(private api: ApiService) { }

  getAllClientsArray(): Observable<any[]> {
    let dataItems: any[] = [];

    return new Observable(observer => {
      this.api.getClient().subscribe({
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

  getClient(client_id: number): any {
    this.api.getClient().subscribe({
      next: (res) => {
        this.singleClient = res.data;

      },
      error: (err) => {
        alert('Error while fetching the data');
      },

    });return this.singleClient;
  }
}
