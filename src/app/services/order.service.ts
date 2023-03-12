import { Injectable } from '@angular/core';
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
export class OrderService {


  constructor() { }
}


