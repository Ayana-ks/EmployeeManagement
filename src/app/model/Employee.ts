
export class Employee {
    
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    childdeptId: number;
    password: string;
    gender: string;
    role: string;
    createdDate: Date;
    empId : number = 0;

    constructor(){
        this.employeeId = this.empId;
        this.employeeName = '';
        this.contactNo = '';
        this.emailId = '';
        this.deptId = 0;
        this.password = '';
        this.gender = '';
        this.role = 'Employee';
        this.createdDate = new Date();
        this.childdeptId = 0;
    }
}

export interface IParentDept{
    departmentId: number;
    departmentName: string;
    departmentLogo: string;
}

export interface IChildDept{
   childDeptId: number;
    parentDeptId: number;
    departmentName: string;
}

export interface IApiResponse{
    message : string;
    result : boolean;
    data : any;
}