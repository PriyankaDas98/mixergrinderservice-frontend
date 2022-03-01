import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayUserComponent } from './Admin/components/display-user/display-user.component';

import { UserDisplayService } from './Admin/services/user-display.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddCenterComponent } from './Admin/components/add-center/add-center.component';
import { routingComponents } from './app-routing.module';
import { EditUserDialogComponent } from './Admin/components/edit-user-dialog/edit-user-dialog.component';
import { AdminNavComponent } from './Admin/components/admin-nav/admin-nav.component';
import { CenterProfileComponent } from './Admin/components/center-profile/center-profile.component';
import { ConfirmpageComponent } from './Admin/components/confirmpage/confirmpage.component';
import { ConfirmDialogComponent } from './Admin/components/confirm-dialog/confirm-dialog.component';
import { DeleteCenterDialogComponent } from './Admin/components/delete-center-dialog/delete-center-dialog.component';
import { EditCenterComponent } from './Admin/components/edit-center/edit-center.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayUserComponent,
    AddCenterComponent,
    routingComponents,
    EditUserDialogComponent,
    AdminNavComponent,
    CenterProfileComponent,
    ConfirmpageComponent,
    ConfirmDialogComponent,
    DeleteCenterDialogComponent,
    EditCenterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  providers: [UserDisplayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
