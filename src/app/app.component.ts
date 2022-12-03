import { AddMemberDialogueComponent } from './add-member-dialogue/add-member-dialogue.component';
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppraisersStaffManagementCrud';

  constructor(private dialog: MatDialog) {

  }
  openDialog() {
    this.dialog.open(AddMemberDialogueComponent, {
      width:'30%'
    });
  };
}

