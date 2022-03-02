import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fileSizeValidator } from 'src/app/shared/image-size-validator';
import { AddCenterService } from '../../services/add-center.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.css'],
})
export class AddCenterComponent implements OnInit {
  serviceCenterForm!: FormGroup;
  // urlPattern = '([a-z-_0-9/:.]*.(jpg|jpeg|png|gif))';
  dataAdded = false;
  imageUrl = '';
  image!: any;
  imagePath!: any;
  fileUrl!: any;
  selectedFile!: File;
  invalidImg!: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _api: AddCenterService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.serviceCenterForm = this._formBuilder.group({
      serviceCenterName: ['', [Validators.required, Validators.minLength(4)]],
      serviceCenterPhone: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.maxLength(12),
        ],
      ],
      serviceCenterAddress: ['', Validators.required],
      serviceCenterImageUrl: [''],
      serviceCenterMailId: ['', [Validators.required, Validators.email]],
      serviceCenterDescription: [
        '',
        [Validators.required, Validators.min(20), Validators.maxLength(100)],
      ],
    });
  }
  get serviceCenterName() {
    return this.serviceCenterForm.get('serviceCenterName');
  }
  get serviceCenterPhone() {
    return this.serviceCenterForm.get('serviceCenterPhone');
  }
  get serviceCenterAddress() {
    return this.serviceCenterForm.get('serviceCenterAddress');
  }
  get serviceCenterImageUrl() {
    return this.serviceCenterForm.get('serviceCenterImageUrl');
  }
  get serviceCenterMailId() {
    return this.serviceCenterForm.get('serviceCenterMailId');
  }
  get serviceCenterDescription() {
    return this.serviceCenterForm.get('serviceCenterDescription');
  }

  addCenter() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '30%',
    });
    // console.log(this.serviceCenterForm);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'submit') {
        this.addConfirm();
      }
    });
  }
  addConfirm() {
    if (this.serviceCenterForm.valid) {
      const formData = new FormData();

      formData.append(
        'serviceCenterName',
        this.serviceCenterForm.get('serviceCenterName')?.value
      );
      formData.append(
        'serviceCenterPhone',
        this.serviceCenterForm.get('serviceCenterPhone')?.value
      );
      formData.append(
        'serviceCenterAddress',
        this.serviceCenterForm.get('serviceCenterAddress')?.value
      );
      formData.append(
        'serviceCenterMailId',
        this.serviceCenterForm.get('serviceCenterMailId')?.value
      );
      formData.append(
        'serviceCenterDescription',
        this.serviceCenterForm.get('serviceCenterDescription')?.value
      );

      formData.append(
        'file',
        this.serviceCenterForm.get('serviceCenterImageUrl')?.value
      );

      this._api.addCenter(formData).subscribe({
        next: (res) => {
          this.dataAdded = true;
          this.image = '';
          console.log(this.serviceCenterForm);
          this.serviceCenterForm.reset();
          this._router.navigate(['/confirmpage']);
        },
        error: () => {
          alert('Error!');
        },
      });
    }
  }

  onFileSelected(event: any, files: any) {
    const file = event.target.files[0];
    const fileSizeKB = Math.round(file.size / 1024);
    if (fileSizeKB > 1000) {
      // alert('too lerge file');
      this.invalidImg = true;
    } else {
      this.invalidImg = false;
      this.serviceCenterImageUrl?.setValue(file);
      this.imageUrl = event.target.files[0].name;
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.image = reader.result;
      };
    }
  }
}
