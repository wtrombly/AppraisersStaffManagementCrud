import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { States } from '../models/states';
import { Appraiser } from '../models/appraiser';
import { AssignOrderComponent } from '../assign-order/assign-order.component';
import { AddMemberDialogueComponent } from '../add-member-dialogue/add-member-dialogue.component';

@Component({
  selector: 'app-appraisers-view',
  templateUrl: './appraisers-view.component.html',
  styleUrls: ['./appraisers-view.component.scss'],
})
export class AppraisersViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'Appraisers Staff Management Crud';

  displayedColumns: string[] = [
    'emp_id',
    'first_name',
    'last_name',
    'street_number',
    'street_name',
    'city',
    'state_name',
    'zip_code',
    'license_level',
    'license_number',
    'fha',
    'va',
    'action',
  ];
  dataSource!: MatTableDataSource<Appraiser>;

  states = States;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllAppraisers();
  }

  openAppraiserDialog() {
    this.dialog
      .open(AddMemberDialogueComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllAppraisers();
        }
      });
  }

  openOrdersDialog() {
    this.dialog
      .open(AssignOrderComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllAppraisers();
        }
      });
  }

  getAllAppraisers() {
    this.api.getAppraiser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.getStateResidenceName(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the data');
      },
    });
  }


  editAppraiser(row: number) {
    this.dialog
      .open(AddMemberDialogueComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllAppraisers();
        }
      });
  }

  deleteAppraiser(emp_id: number) {
    this.api.deleteAppraiser(emp_id).subscribe({
      next: (res) => {
        alert('Appraiser successfully deleted');
        this.getAllAppraisers();
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

  // for obtaining the state residence of all appraisers and placing that in an array
  getStateResidenceName(dataSource: MatTableDataSource<Appraiser>): any {
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
