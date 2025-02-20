import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  createNewEmployee(obj:Employee) {
    return this.http.post<Employee>("http://localhost:5045/api/Employee/CreateEmployee",obj);
  }

  updateEmployee(obj:Employee) {
    return this.http.put<Employee>("http://localhost:5045/api/Employee/UpdateEmployee/"+obj.employeeId,obj);
  }

  getEmployees(){
    return this.http.get<Employee[]>("http://localhost:5045/api/Employee/GetEmployees");

  }

  deleteEmpById(id:number){
    return this.http.delete<Employee>("http://localhost:5045/api/Employee/"+id);

  }
}
