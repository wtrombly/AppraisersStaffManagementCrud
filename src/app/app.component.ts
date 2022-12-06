import { AddMemberDialogueComponent } from './add-member-dialogue/add-member-dialogue.component';
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from './services/api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppraisersStaffManagementCrud';



  constructor(private dialog: MatDialog, private api : ApiService) {
  }
  openDialog() {
    this.dialog.open(AddMemberDialogueComponent, {
      width:'30%'
    });
  };
}

