import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit, AfterViewChecked } from '@angular/core';
import { States } from 'src/app/models/states';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appraiser } from '../models/appraiser';
import { AppraiserService } from '../services/appraiser.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.scss'],
})
export class AssignOrderComponent implements OnInit {
  orderForm!: FormGroup;
  actionBtn: string = 'Assign Order';
  public states = States;
  statesFormControl = new FormControl('');

  dataSourceAppraiser!: MatTableDataSource<Appraiser>;
  public messageForSibling!: string;
  public subscription!: Subscription;

  dataItems!: any[];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ApiService) private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private appraiserService: AppraiserService,
    private dialofRef: MatDialogRef<AssignOrderComponent>
  ) {
    this.appraiserService.getAllAppraisersArray().subscribe((dataItems) => {
      this.dataItems = dataItems;
    });
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      id: [''],
      street_number: [''],
      street_name: [''],
      city: [''],
      state_id: [''],
      zip_code: [''],
      client_name: [''],
      order_fee: [''],
      /*  dueDate: [''], */
      notes: [''],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.orderForm.controls['id'].setValue(this.editData.id);
      this.orderForm.controls['street_number'].setValue(
        this.editData.street_number
      );
      this.orderForm.controls['street_name'].setValue(
        this.editData.street_name
      );
      this.orderForm.controls['state'].setValue(this.editData.state);
      this.orderForm.controls['city'].setValue(this.editData.city);
      this.orderForm.controls['zip_code'].setValue(this.editData.zip_code);
      this.orderForm.controls['client_name'].setValue(
        this.editData.client_name
      );
      this.orderForm.controls['order_fee'].setValue(this.editData.order_fee);
      /* this.orderForm.controls['dueDate'].setValue(this.editData.dueDate); */
      this.orderForm.controls['notes'].setValue(this.editData.notes);
    }
  }

  addOrder() {
    if (!this.editData) {
      if (this.orderForm.valid) {
        this.api.postOrder(this.orderForm.value).subscribe({
          next: (res) => {
            alert('Order added successfully');
            this.orderForm.reset();
            this.dialofRef.close('save');
          },
          error: () => {
            alert('Error while adding order!!');
          },
        });
      }
    } else {
      this.updateOrder();
    }
  }

  updateOrder() {
    this.api.putOrder(this.orderForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Order updated successfully');
        this.orderForm.reset;
        this.dialofRef.close('update');
      },
      error: () => {
        alert('Error while updating the order');
      },
    });
  }
}
