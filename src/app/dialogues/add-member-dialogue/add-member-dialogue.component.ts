import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { States } from 'src/app/models/states';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppraiserService } from '../../services/appraiser.service';
import { Appraiser } from '../../models/appraiser';

@Component({
  selector: 'app-add-member-dialogue',
  templateUrl: './add-member-dialogue.component.html',
  styleUrls: ['./add-member-dialogue.component.scss'],
})
export class AddMemberDialogueComponent implements OnInit {
  staffAppraiserForm!: FormGroup;
  actionBtn: string = 'Save';

  public states = States;
  statesFormControl = new FormControl('');
  multipleSelectList = States;
  dataItems: Appraiser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ApiService) private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialofRef: MatDialogRef<AddMemberDialogueComponent>,
    private appraiserService: AppraiserService
  ) {
    this.appraiserService.getAllAppraisersArray().subscribe((dataItems) => {
      this.dataItems = dataItems;
    });
  }

  ngOnInit(): void {
    this.staffAppraiserForm = this.formBuilder.group({
      emp_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      street_number: ['', Validators.required],
      street_name: ['', Validators.required],
      city: ['', Validators.required],
      state_id: ['', Validators.required],
      zip_code: ['', Validators.required],
      license_level: ['', Validators.required],
      license_number: ['', Validators.required],
      fha: ['', Validators.required],
      va: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.staffAppraiserForm.controls['emp_id'].setValue(this.editData.emp_id);
      this.staffAppraiserForm.controls['first_name'].setValue(
        this.editData.first_name
      );
      this.staffAppraiserForm.controls['last_name'].setValue(
        this.editData.last_name
      );
      this.staffAppraiserForm.controls['street_number'].setValue(
        this.editData.street_number
      );
      this.staffAppraiserForm.controls['street_name'].setValue(
        this.editData.street_name
      );
      this.staffAppraiserForm.controls['state_id'].setValue(
        this.editData.state_id
      );
      this.staffAppraiserForm.controls['city'].setValue(this.editData.city);
      this.staffAppraiserForm.controls['zip_code'].setValue(
        this.editData.zip_code
      );
      this.staffAppraiserForm.controls['license_level'].setValue(
        this.editData.license_level
      );
      this.staffAppraiserForm.controls['license_number'].setValue(
        this.editData.license_number
      );
      this.staffAppraiserForm.controls['fha'].setValue(this.editData.fha);
      this.staffAppraiserForm.controls['va'].setValue(this.editData.va);
      this.staffAppraiserForm.controls['phone'].setValue(this.editData.phone);
      this.staffAppraiserForm.controls['email'].setValue(this.editData.email);
    }
  }

  addAppraiser() {
    if (!this.editData) {
      if (this.staffAppraiserForm.valid) {
        if(!this.doesAppraiserWithIDExist(this.staffAppraiserForm.value.emp_id)){
          this.api.postAppraiser(this.staffAppraiserForm.value).subscribe({
            next: (res) => {
              alert('Appraiser added successfully');
              this.staffAppraiserForm.reset();
              this.dialofRef.close('save');
            },
            error: (err) => {
              console.log(err.error.message);
                alert('Error while adding appraiser!!');
            },
          });
        } else {
          alert('That appraiser ID has already been used');
        }
      }
    } else {
      this.updateAppraiser();
    }
  }

  updateAppraiser() {
    console.log('update appraiser', this.staffAppraiserForm.value);
    console.log(this.editData.emp_id);
    this.api
      .putAppraiser(this.staffAppraiserForm.value, this.editData.emp_id)
      .subscribe({
        next: (res) => {
          alert('Appraiser Profile updated successfully');
          this.staffAppraiserForm.reset;
          this.dialofRef.close('update');
        },
        error: () => {
          alert('Error while updating the profile');
        },
      });
  }

  doesAppraiserWithIDExist(emp_id: number): boolean {
    for (const element of this.dataItems) {
      if (element.emp_id == emp_id) {
        return true;
      }
    }
    return false;
  }

}
