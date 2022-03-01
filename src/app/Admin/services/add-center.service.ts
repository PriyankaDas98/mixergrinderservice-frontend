import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceCenter } from '../model/serviceCenter';

@Injectable({
  providedIn: 'root',
})
export class AddCenterService {
  editCenter(formData: FormData, serviceCenterID: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  addCenter(formData: any) {
    return this.http.post<ServiceCenter[]>(
      'http://localhost:8081/admin/addServiceCenter',
      formData
    );
  }
  getCenter(): Observable<ServiceCenter[]> {
    return this.http.get<ServiceCenter[]>(
      'http://localhost:8081/admin/getServiceCenter'
    );
  }
  //delete Center
  public deleteCenter(serviceCenterID: any): Observable<any> {
    console.log('inside delete center');
    console.log(serviceCenterID);
    console.log(
      'http://localhost:8081/admin/deleteServiceCenter/' + serviceCenterID
    );
    return this.http.delete(
      'http://localhost:8081/admin/deleteServiceCenter/' + serviceCenterID
    );
  }
  updateCenter(data: any, id: any) {
    return this.http.put<ServiceCenter[]>(
      'http://localhost:8081/admin/editServiceCenter/' + id,
      data
    );
  }
}
