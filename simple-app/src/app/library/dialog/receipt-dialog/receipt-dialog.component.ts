import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import { ClipboardService } from 'ngx-clipboard'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.css']
})
export class ReceiptDialogComponent implements OnInit {

  private title: string;
  private rCode: string;
  private form: FormGroup;
  private copied: boolean = false;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ReceiptDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog, private clipBoard: ClipboardService) {
    this.title = data.title;
    this.rCode = data.rCode;
    console.log(this.rCode);
    this.form = fb.group({
      recCode: [this.rCode]
    });
  }

  ngOnInit() {
  }

  copyToClipBoard(rCode: string) {
    this.clipBoard.copyFromContent(rCode);
    this.copied = true;
  }

  close() {
    this.dialog.closeAll();
  }
}
