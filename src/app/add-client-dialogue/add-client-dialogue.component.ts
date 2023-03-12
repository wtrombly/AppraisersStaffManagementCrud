import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { States } from 'src/app/models/states';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-dialogue',
  templateUrl: './add-client-dialogue.component.html',
  styleUrls: ['./add-client-dialogue.component.scss'],
})
export class AddClientDialogueComponent implements OnInit {
  clientForm!: FormGroup;
  actionBtn: string = 'Save';

  public states = States;
  statesFormControl = new FormControl('');
  multipleSelectList = States;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ApiService) private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialofRef: MatDialogRef<AddClientDialogueComponent>
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      client_id: ['', Validators.required],
      business_name: ['', Validators.required],
      poc_first_name: ['', Validators.required],
      poc_last_name: ['', Validators.required],
      street_number: ['', Validators.required],
      street_name: ['', Validators.required],
      city: ['', Validators.required],
      state_id: ['', Validators.required],
      zip_code: ['', Validators.required],
      poc_phone: ['', Validators.required],
      email: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';

      this.clientForm.controls['client_id'].setValue(this.editData.emp_id);
      this.clientForm.controls['business_name'].setValue(
        this.editData.business_name
      );
      this.clientForm.controls['poc_first_name'].setValue(
        this.editData.poc_first_name
      );
      this.clientForm.controls['poc_last_name'].setValue(
        this.editData.poc_last_name
      );
      this.clientForm.controls['street_number'].setValue(
        this.editData.street_number
      );
      this.clientForm.controls['street_name'].setValue(
        this.editData.street_name
      );
      this.clientForm.controls['state_id'].setValue(this.editData.state_id);
      this.clientForm.controls['city'].setValue(this.editData.city);
      this.clientForm.controls['zip_code'].setValue(this.editData.zip_code);
      this.clientForm.controls['poc_phone'].setValue(
        this.editData.license_level
      );
      this.clientForm.controls['email'].setValue(this.editData.license_number);
    }
  }

  addClient() {
    if (!this.editData) {
      debugger;
      console.log("addClient has been called");
      if (this.clientForm.valid) {
        console.log(this.clientForm);
        this.api.postClient(this.clientForm.value).subscribe({
          next: (res) => {
            console.log('log res', res);
            alert('Client added successfully');
            this.clientForm.reset();
            this.dialofRef.close('save');
          },
          error: () => {
            console.error();

            alert('Error while adding client!!');
          },
        });
      }
    } else {
      this.updateClient();
    }
  }

  updateClient() {
    console.log('update client', this.clientForm.value);
    console.log(this.editData.client_id);
    this.api
      .putClient(this.clientForm.value, this.editData.client_id)
      .subscribe({
        next: (res) => {
          alert('Client Profile updated successfully');
          this.clientForm.reset;
          this.dialofRef.close('update');
        },
        error: () => {
          alert('Error while updating the profile');
        },
      });
  }

  



}
