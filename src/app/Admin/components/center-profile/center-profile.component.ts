import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteCenterDialogComponent } from 'src/app/Admin/components/delete-center-dialog/delete-center-dialog.component';
import { AddCenterService } from '../../services/add-center.service';
import { EditCenterComponent } from '../edit-center/edit-center.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-center-profile',
  templateUrl: './center-profile.component.html',
  styleUrls: ['./center-profile.component.css'],
})
export class CenterProfileComponent implements OnInit {
  constructor(
    private _api: AddCenterService,
    private _dialog: MatDialog,
    private _router: Router
  ) {}
  public centerData: any;
  ngOnInit(): void {
    this._api.getCenter().subscribe((data) => (this.centerData = data));
  }
  editDialog(center: any) {
    // this._router.navigate(['/editCenter']);
    const dialogRef = this._dialog.open(EditCenterComponent, {
      width: '60%',
      data: center,
    });
    dialogRef.afterClosed().subscribe();
  }

  deleteDialog(serviceCenterID: any) {
    const dialogRef = this._dialog.open(DeleteCenterDialogComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val == 'delete') {
        this._api.deleteCenter(serviceCenterID).subscribe((data) => {
          // this._router.navigate(['/confirmpage']);
          this.centerData = this.centerData.filter(
            (ServiceCenter: any) =>
              ServiceCenter.serviceCenterID != serviceCenterID
          );
          alert('deleted successfully!!');
          // location.reload();
          // console.log(data);
        });
      }
    });
  }
}
