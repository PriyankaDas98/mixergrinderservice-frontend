import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserDisplayService } from '../../services/user-display.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css'],
})
export class DisplayUserComponent implements OnInit {
  constructor(
    private _displayUserService: UserDisplayService,
    private _dialog: MatDialog
  ) {}
  public data: any = [];
  public dataSource: any = [];
  displayedColumns: string[] = ['userName', 'email', 'phoneNumber', 'actions'];
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey!: string;

  ngOnInit(): void {
    this._displayUserService.getUsers().subscribe((data) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  openDialog(row: any) {
    const dialogRef = this._dialog
      .open(EditUserDialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.ngOnInit();
        }
      });
  }
}
