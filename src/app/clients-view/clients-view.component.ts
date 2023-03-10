import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { States } from '../models/states';
import { AddClientDialogueComponent } from '../add-client-dialogue/add-client-dialogue.component';
import { Client } from '../models/client';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss'],
})
export class ClientsViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = ' Client Staff Management Crud';

  displayedColumns: string[] = [
    'client_id',
    'business_name',
    'poc_first_name',
    'poc_last_name',
    'street_number',
    'street_name',
    'city',
    'state_name',
    'zip_code',
    'poc_phone',
    'email',
  ];

  clientDataSource!: MatTableDataSource<Client>;

  states = States;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  openClientDialog() {
    this.dialog
      .open(AddClientDialogueComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllClients();
        }
      });
  }

  getAllClients() {
    this.api.getClient().subscribe({
      next: (res) => {
        console.log(res.data);
        this.clientDataSource = new MatTableDataSource(res.data);
        this.getStateResidenceName(this.clientDataSource);
        this.clientDataSource.paginator = this.paginator;
        this.clientDataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the data regarding customer clients');
      },
    });
  }

  editClient(row: number) {
    this.dialog
      .open(AddClientDialogueComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllClients();
        }
      });
  }

  deleteClient(emp_id: number) {
    this.api.deleteClient(emp_id).subscribe({
      next: (res) => {
        alert('Client successfully deleted');
        this.getAllClients();
      },
      error: () => {
        alert('Error while removing client!!');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientDataSource.filter = filterValue.trim().toLowerCase();

    if (this.clientDataSource.paginator) {
      this.clientDataSource.paginator.firstPage();
    }
  }

  // for obtaining the state residence of all clients and placing that in an array
  getStateResidenceName(dataSource: MatTableDataSource<Client>): any {
    const data = this.clientDataSource.data;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.states.length; j++) {
        if (data[i].state_id == this.states[j].id) {
          data[i].state_name = this.states[j].name;
        }
      }
    }
  }

}
