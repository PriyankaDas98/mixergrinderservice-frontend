import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCenterComponent } from './Admin/components/add-center/add-center.component';
import { CenterProfileComponent } from './Admin/components/center-profile/center-profile.component';
import { ConfirmpageComponent } from './Admin/components/confirmpage/confirmpage.component';
import { DisplayUserComponent } from './Admin/components/display-user/display-user.component';
import { EditCenterComponent } from './Admin/components/edit-center/edit-center.component';

const routes: Routes = [
  { path: 'displayuser', component: DisplayUserComponent },
  { path: 'addcenter', component: AddCenterComponent },
  { path: 'centerprofile', component: CenterProfileComponent },
  { path: 'confirmpage', component: ConfirmpageComponent },
  { path: 'editCenter', component: EditCenterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [DisplayUserComponent, AddCenterComponent];
