import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
 
  ngOnInit(): void {
    this.getParentDeptList();
    this.getAllEmployessList();
  } 
 
  parentDeptList :IParentDept[] = [];
  deptid : number = 0;
  parsedData = JSON.parse(localStorage.getItem("employeeApp") || '""');
  empId : number = this.parsedData.employeeId;

  //constructor(){
    
  //  if (this.employeeData) {
    //  const parsedData = JSON.parse(this.employeeData);
      //this.empId = parsedData.employeeId;
      //console.log('Employee ID:', parsedData.employeeId);
   // } 
  //}
  

  childDeptList : IChildDept [] = [];
  employeesList :Employee[] = [];

  employeeObj : Employee = new Employee();

  masterService = inject(MasterService);
  empService = inject(EmployeeService);


  isSidePanelOpen = signal<boolean>(false);

  addNew(){
    //this.employeeObj.empId = 0;
    this.employeeObj = new Employee();
    this.isSidePanelOpen.set(true);
  }
  close(){
    this.isSidePanelOpen.set(false);
  }
  
  onEdit(obj:Employee){
    this.employeeObj = obj;
    this.isSidePanelOpen.set(true);
  }

  getAllEmployessList(){
    // if (this.employeeObj.deptId === 0) {
    //   console.log('emp',this.employeeObj.deptId)
    //   alert('Please select a child department.');
    //   return;
    // }
    this.empService.getEmployees().subscribe((res:Employee[])=>{
      this.employeesList = res;
      console.log('emplist',this.employeesList)
   })
  }

  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res:IApiResponse)=>{
       this.parentDeptList = res.data;
       console.log('dept',res.data);
       console.log('deptlist',this.parentDeptList)
    })
  }

  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.employeeObj.deptId).subscribe((res:IApiResponse)=>{
      this.childDeptList = res.data;
      console.log('childdept',res.data);
       console.log('childdeptlist',this.childDeptList)
    })
  }

  // onSaveEmployee(){
  //   this.empService.createNewEmployee(this.employeeObj).subscribe((res:Employee)=>{
  //       alert("Employee Created Successfully");
  //       this.getAllEmployessList();
  //     },error=>{
  //       alert('Error From API')
  //   })
  // }

 // Called to create a new employee
 onSaveEmployee() {
  this.empService.createNewEmployee(this.employeeObj).subscribe((res: Employee) => {
    alert("Employee Created Successfully");
    this.getAllEmployessList();  // Refresh the employees list
  }, error => {
    alert('Error From API');
  });
}


  onUpdateEmp(){
    //this.employeeObj.empId = this.empId;
    this.empService.updateEmployee(this.employeeObj).subscribe((res:Employee)=>{
      alert("Employee Updated Successfully");
      this.getAllEmployessList();
    },error=>{
      alert('Error From API')
  })
  }

  onDelete(id:number){
    const result = confirm("Are you sure you want to delete");
    if(result){
      this.empService.deleteEmpById(id).subscribe((res:Employee)=>{
        alert("Employee Deleted Successful");
        this.getAllEmployessList();
      },error=>{
        alert('Error From API')
    })
    }
  }

}
