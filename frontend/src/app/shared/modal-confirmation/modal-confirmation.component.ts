import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }



  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
