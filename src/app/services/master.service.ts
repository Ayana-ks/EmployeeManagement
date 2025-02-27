import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getParentDept(){
   return this.http.get<IApiResponse>("http://localhost:5045/api/Department/GetParentDepartments");
  }

  getChildDeptByParentId(id : number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>("http://localhost:5045/api/Department/child?deptId=" +id);
   }
}
