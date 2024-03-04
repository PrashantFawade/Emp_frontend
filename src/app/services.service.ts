import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor( private http : HttpClient) { }

  /* posting Employees Data */
  AddEmployee(EmployeeData:any){
    console.log(EmployeeData);
    
    let data = this.http.post('http://localhost:7000/AddEmployee', EmployeeData)
    console.log(data);
    return data;
  }


  /* fetching Employees Data */
  getEmployeesData(){
    console.log("this is data emp");
    return this.http.get('http://localhost:7000/GetEmployeesData');
  }

  /* fetching Employees Data */
  getDepartmentData(){
    console.log("this is data dept");
    return this.http.get('http://localhost:7000/GetDepartmentData');
  }

  /*  posting department data */
  AddDepartment(DepartmentData:any){
       let data = this.http.post('http://localhost:7000/AddDepartment' , DepartmentData);
       return data;
  }

  // assigning department

  AssignDepartment(Assigndata:any){
    console.log("in service : >>" + Assigndata.empName);
    
    let d = this.http.post('http://localhost:7000/AssignDepartment' , Assigndata);
    return d;
  }

  updateDepartment(dept:any,id:any){
    console.log("in front end service");
    
    this.http.put('http://localhost:7000/updateDepartment' , dept , id);
  }

}
