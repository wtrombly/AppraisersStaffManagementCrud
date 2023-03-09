import { Component, ViewChild, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { States } from '../models/states';
import { AssignOrderComponent } from '../assign-order/assign-order.component';
import { MatDialog } from '@angular/material/dialog';
import { AppraiserService } from '../services/appraiser.service';
import { Appraiser } from '../models/appraiser';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
})
export class OrdersViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'Orders Management CRUD';

  displayedColumns: string[] = [
    'id',
    'street_number',
    'street_name',
    'city',
    'state_name',
    'zip_code',
    'client_name',
    'order_fee',
    'notes',
    'emp_id',
  ];

  dataSource!: MatTableDataSource<Order>;

  states = States;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllOrders();
   
  }

  openOrdersDialog() {
    this.dialog
      .open(AssignOrderComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllOrders();
        }
      });
  }

  getAllOrders() {
    this.api.getOrder().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.getStateResidenceName(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error: (err) => {
        alert('Error while fetching the data');
      },
    });
  }

  editOrder(row: number) {
    console.log(row);
    this.dialog
      .open(AssignOrderComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllOrders();
        }
      });
  }

  deleteOrder(id: number) {
    this.api.deleteOrder(id).subscribe({
      next: (res) => {
        alert('Appraiser successfully deleted');
        this.getAllOrders();
      },
      error: () => {
        alert('Error while removing appraiser!!');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStateResidenceName(dataSource: MatTableDataSource<Order>): any {
    const data = this.dataSource.data;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.states.length; j++) {
        if (data[i].state_id == this.states[j].id) {
          data[i].state_name = this.states[j].name;
        }
      }
    }
  }
}
