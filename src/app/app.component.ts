import { AddMemberDialogueComponent } from './add-member-dialogue/add-member-dialogue.component';
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AppraiserProfiles } from './models/appraiser-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppraisersStaffManagementCrud';

  public AppraiserProfile = AppraiserProfiles;

  constructor(private dialog: MatDialog) {
  }
  openDialog() {
    this.dialog.open(AddMemberDialogueComponent, {
      width:'30%'
    });
  };
}

