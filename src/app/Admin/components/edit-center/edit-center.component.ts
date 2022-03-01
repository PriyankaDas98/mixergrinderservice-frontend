import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCenterService } from '../../services/add-center.service';

@Component({
  selector: 'app-edit-center',
  templateUrl: './edit-center.component.html',
  styleUrls: ['./edit-center.component.css'],
})
export class EditCenterComponent implements OnInit {
  serviceCenterForm!: FormGroup;
  // urlPattern = '([a-z-_0-9/:.]*.(jpg|jpeg|png|gif))';
  dataAdded = false;
  imageUrl = '';
  image!: any;
  imagePath!: any;
  fileUrl!: any;
  selectedFile!: File;
  invalidImg!: any;
  editCenterForm: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _api: AddCenterService,
    private _router: Router,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.image = this.editData.serviceCenterImageUrl;
    this.editCenterForm = this._formBuilder.group({
      id: [''],
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
    console.log(this.editData);
    console.log(this.editData.serviceCenterName);
    if (this.editData) {
      this.editCenterForm.controls['serviceCenterName'].setValue(
        this.editData.serviceCenterName
      );
      this.editCenterForm.controls['serviceCenterPhone'].setValue(
        this.editData.serviceCenterPhone
      );
      this.editCenterForm.controls['serviceCenterMailId'].setValue(
        this.editData.serviceCenterMailId
      );
      this.editCenterForm.controls['serviceCenterAddress'].setValue(
        this.editData.serviceCenterAddress
      );
      this.editCenterForm.controls['serviceCenterImageUrl'].setValue(
        this.editData.serviceCenterImageUrl
      );
      this.editCenterForm.controls['serviceCenterDescription'].setValue(
        this.editData.serviceCenterDescription
      );
    }
  }
  get serviceCenterName() {
    return this.editCenterForm.get('serviceCenterName');
  }
  get serviceCenterPhone() {
    return this.editCenterForm.get('serviceCenterPhone');
  }
  get serviceCenterAddress() {
    return this.editCenterForm.get('serviceCenterAddress');
  }
  get serviceCenterImageUrl() {
    return this.editCenterForm.get('serviceCenterImageUrl');
  }
  get serviceCenterMailId() {
    return this.editCenterForm.get('serviceCenterMailId');
  }
  get serviceCenterDescription() {
    return this.editCenterForm.get('serviceCenterDescription');
  }

  editCenter() {
    if (this.editCenterForm.valid) {
      const formData = new FormData();
      formData.append('id', this.editCenterForm.get('id')?.value);
      formData.append(
        'serviceCenterName',
        this.editCenterForm.get('serviceCenterName')?.value
      );
      formData.append(
        'serviceCenterPhone',
        this.editCenterForm.get('serviceCenterPhone')?.value
      );
      formData.append(
        'serviceCenterAddress',
        this.editCenterForm.get('serviceCenterAddress')?.value
      );
      formData.append(
        'serviceCenterMailId',
        this.editCenterForm.get('serviceCenterMailId')?.value
      );
      formData.append(
        'serviceCenterDescription',
        this.editCenterForm.get('serviceCenterDescription')?.value
      );

      formData.append(
        'file',
        this.editCenterForm.get('serviceCenterImageUrl')?.value
      );
      console.log(formData);
      this._api
        .updateCenter(formData, this.editData.serviceCenterID)
        .subscribe({
          next: (res: any) => {
            this.dataAdded = true;
            this.image = '';
            console.log(this.editCenterForm);
            this.editCenterForm.reset();
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
    if (fileSizeKB > 500) {
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
