import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { States } from 'src/app/models/states';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  multipleSelectList: string[] = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Minor Outlying Islands',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'U.S. Virgin Islands',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialofRef: MatDialogRef<AddMemberDialogueComponent>
  ) {}

  ngOnInit(): void {
    this.staffAppraiserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      licenseLevel: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      FHA: ['', Validators.required],
      VA: ['', Validators.required],
      dataOfPlacement: ['', Validators.required],
      stateCoverage: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.staffAppraiserForm.controls['firstName'].setValue(
        this.editData.firstName
      );
      this.staffAppraiserForm.controls['lastName'].setValue(
        this.editData.lastName
      );
      this.staffAppraiserForm.controls['streetNumber'].setValue(
        this.editData.streetNumber
      );
      this.staffAppraiserForm.controls['streetName'].setValue(
        this.editData.streetName
      );
      this.staffAppraiserForm.controls['state'].setValue(this.editData.state);
      this.staffAppraiserForm.controls['zipCode'].setValue(
        this.editData.zipCode
      );
      this.staffAppraiserForm.controls['licenseLevel'].setValue(
        this.editData.licenseLevel
      );
      this.staffAppraiserForm.controls['licenseNumber'].setValue(
        this.editData.licenseNumber
      );
      this.staffAppraiserForm.controls['FHA'].setValue(this.editData.FHA);
      this.staffAppraiserForm.controls['VA'].setValue(this.editData.VA);
      this.staffAppraiserForm.controls['dataOfPlacement'].setValue(
        this.editData.dataOfPlacement
      );
      this.staffAppraiserForm.controls['stateCoverage'].setValue(
        this.editData.stateCoverage
      );
    }
  }

  addAppraiser() {
    if (!this.editData) {
      if (this.staffAppraiserForm.valid) {
        this.api.postAppraiser(this.staffAppraiserForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.staffAppraiserForm.reset();
            this.dialofRef.close('save');
          },
          error: () => {
            alert('Error while adding appraiser!!');
          },
        });
      }
    } else {
      this.updateAppraiser();
    }
  }

  updateAppraiser() {
    this.api
      .putAppraiser(this.staffAppraiserForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Profile updated successfully');
          this.staffAppraiserForm.reset;
          this.dialofRef.close('update');
        },
        error: () => {
          alert('Error while updating the profile');
        },
      });
  }
}
