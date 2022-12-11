import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { States } from 'src/app/models/states';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.scss']
})
export class AssignOrderComponent {
  orderForm!: FormGroup;
  actionBtn: string = 'Save';
  public states = States;
  statesFormControl = new FormControl('');


  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialofRef: MatDialogRef<AssignOrderComponent>){}

    ngOnInit(): void {
      this.orderForm = this.formBuilder.group({
        orderNumber: ['', Validators.required],
        streetNumber: ['', Validators.required],
        streetName: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        clientName: ['', Validators.required],
        orderFee: ['', Validators.required],
        dueDate: ['', Validators.required],
        notes: ['', Validators.required],
      });


    if (this.editData) {
      this.actionBtn = 'Update';
      this.orderForm.controls['orderNumber'].setValue(
        this.editData.orderNumber
      );
      this.orderForm.controls['streetNumber'].setValue(
        this.editData.streetNumber
      );
      this.orderForm.controls['streetName'].setValue(
        this.editData.streetName
      );
      this.orderForm.controls['state'].setValue(this.editData.state);
      this.orderForm.controls['city'].setValue(this.editData.city);
      this.orderForm.controls['zipCode'].setValue(
        this.editData.zipCode
      );
      this.orderForm.controls['clientName'].setValue(
        this.editData.clientName
      );
      this.orderForm.controls['orderFee'].setValue(
        this.editData.orderFee
      );
      this.orderForm.controls['dueDate'].setValue(this.editData.dueDate);
      this.orderForm.controls['notes'].setValue(this.editData.notes);

    }

    }

    addOrder() {
      if (!this.editData) {
        if (this.orderForm.valid) {
          this.api.postAppraiser(this.orderForm.value)
          .subscribe({
            next: (res) => {
              alert("Order added successfully");
              this.orderForm.reset();
              this.dialofRef.close('save');
            },
            error: () => {
              alert("Error while adding order!!");
            },
          });
        }
      } else {
        this.updateOrder();
      }
    }

    updateOrder() {
      this.api.putAppraiser(this.orderForm.value, this.editData.id)
        .subscribe({
          next:(res)=>{
            alert("Order updated successfully");
            this.orderForm.reset;
            this.dialofRef.close('update');
          },
          error: () => {
            alert("Error while updating the order");
          },
        });
    }
}
