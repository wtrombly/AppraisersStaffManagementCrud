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
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
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
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
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
    @Inject(ApiService) private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialofRef: MatDialogRef<AddMemberDialogueComponent>){}

  ngOnInit(): void {
    this.staffAppraiserForm = this.formBuilder.group({

      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      street_number: ['', ],
      street_name: ['',],
      city: ['', ],
      state_name: ['', ],
      zip_code: ['', ],
      license_level: ['', ],
      license_number: ['', ],
      fha: ['', ],
      va: ['', ],
      employment_date: ['', ]
      /* activeOrders: ['', ],
      stateCoverage: ['', ], */
    });

    if (this.editData) {
      this.actionBtn = 'Update';
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
      this.staffAppraiserForm.controls['state_name'].setValue(this.editData.state_name);
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
      /* this.staffAppraiserForm.controls['employment_date'].setValue(
        this.editData.employment_date
      ); */
      /* this.staffAppraiserForm.controls['activeOrders'].setValue(this.editData.activeOrders);
      this.staffAppraiserForm.controls['stateCoverage'].setValue(
        this.editData.stateCoverage
      ); */

    }
  }

  addAppraiser() {
    if (!this.editData) {
      if (this.staffAppraiserForm.valid) {
        console.log(this.staffAppraiserForm)
        this.api.postAppraiser(this.staffAppraiserForm.value)
        .subscribe({
          next: (res) => {
            console.log("log res", res);
            alert("Appraiser added successfully");
            this.staffAppraiserForm.reset();
            this.dialofRef.close('save');
          },
          error: () => {
            console.error();


            alert("Error while adding appraiser!!");
          },
        });
      }
    } else {
      this.updateAppraiser();
    }
  }

  updateAppraiser() {
    this.api.putAppraiser(this.staffAppraiserForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Profile updated successfully");
          this.staffAppraiserForm.reset;
          this.dialofRef.close('update');
        },
        error: () => {
          alert("Error while updating the profile");
        },
      });
  }
}
