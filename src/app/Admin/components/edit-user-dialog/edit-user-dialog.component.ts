import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDisplayService } from '../../services/user-display.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent implements OnInit {
  editUserForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _api: UserDisplayService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.editUserForm = this._formBuilder.group({
      userName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.maxLength(12),
        ],
      ],
    });
    if (this.editData) {
      this.editUserForm.controls['userName'].setValue(this.editData.userName);
      this.editUserForm.controls['email'].setValue(this.editData.email);
      this.editUserForm.controls['phoneNumber'].setValue(
        this.editData.phoneNumber
      );
    }
  }
  get userName() {
    return this.editUserForm.get('userName');
  }
  get email() {
    return this.editUserForm.get('email');
  }
  get phoneNumber() {
    return this.editUserForm.get('phoneNumber');
  }
  updateUser() {
    if (this.editUserForm.valid) {
      this._api
        .updateUsers(this.editUserForm.value, this.editData.id)
        .subscribe({
          next: (res) => {
            alert('update');
            this.editUserForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            alert('Error while updating the record!');
          },
        });
    }
  }
}
